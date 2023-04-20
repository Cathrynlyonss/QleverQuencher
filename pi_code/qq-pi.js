//set up firebase
var firebase = require( 'firebase/app' );
const { getDatabase, ref, onValue, set, update, get } = require('firebase/database');


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDgSFGxQkSpZ1q_4FwYmFt3_NAtlgBTPAQ",
    authDomain: "qleverquencher.firebaseapp.com",
    databaseURL: "https://qleverquencher-default-rtdb.firebaseio.com",
    projectId: "qleverquencher",
    storageBucket: "qleverquencher.appspot.com",
    messagingSenderId: "1091355581688",
    appId: "1:1091355581688:web:64a2fe5cdc38e7c5edaf0d",
    measurementId: "G-QW3514J2RM"
};
firebase.initializeApp(   firebaseConfig  );

  //db ref
  const database = getDatabase();



//set up bluetooth
const { createBluetooth } = require( 'node-ble' );


//abby & cathryn arduino nano address
//const ARDUINO_BLUETOOTH_ADDR = '1b:91:ae:f6:85:53';
//arduino uno w bluefruit address
const ARDUINO_BLUETOOTH_ADDR = 'F4:D9:23:8E:84:C1';


const UART_SERVICE_UUID      = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E';
const TX_CHARACTERISTIC_UUID = '6E400002-B5A3-F393-E0A9-E50E24DCCA9E';
const RX_CHARACTERISTIC_UUID = '6E400003-B5A3-F393-E0A9-E50E24DCCA9E';

async function main( )
{
    // Reference the BLE adapter and begin device discovery...
    const { bluetooth, destroy } = createBluetooth();
    const adapter = await bluetooth.defaultAdapter();
    const discovery =  await adapter.startDiscovery();
    console.log( 'discovering...' );

    // Attempt to connect to the device with specified BT address
    const device = await adapter.waitDevice( ARDUINO_BLUETOOTH_ADDR.toUpperCase() );
    console.log( 'found device. attempting connection...' );
    await device.connect();
    console.log( 'connected to device!' );

    // Get references to the desired UART service and its characteristics
    const gattServer = await device.gatt();
    const uartService = await gattServer.getPrimaryService( UART_SERVICE_UUID.toLowerCase() );
    const txChar = await uartService.getCharacteristic( TX_CHARACTERISTIC_UUID.toLowerCase() );
    const rxChar = await uartService.getCharacteristic( RX_CHARACTERISTIC_UUID.toLowerCase() );

    // Register for notifications on the RX characteristic
    await rxChar.startNotifications( );

    // Callback for when data is received on RX characteristic
    rxChar.on( 'valuechanged', buffer =>
    {
        console.log('Received: ' + buffer.toString());

        var updates = {}
        updates['/weight'] = String(buffer);

        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        updates['/time'] = String(time)
        //send updated info to db
        update(ref(database), updates)
    });

    // Set up listener for console input.
    // When console input is received, write it to TX characteristic
    const stdin = process.openStdin( );
    stdin.addListener( 'data', async function( d )
    {
        let inStr = d.toString( ).trim( );

        // Disconnect and exit if user types 'exit'
        if (inStr === 'exit')
        {
            console.log( 'disconnecting...' );
            await device.disconnect();
            console.log( 'disconnected.' );
            destroy();
            process.exit();
        }

        // Specification limits packets to 20 bytes; truncate string if too long.
        inStr = (inStr.length > 20) ? inStr.slice(0,20) : inStr;

        // Attempt to write/send value to TX characteristic
        await txChar.writeValue(Buffer.from(inStr)).then(() =>
        {
            console.log('Sent: ' + inStr);
        });
    });
}

main().then((ret) =>
{
    if (ret) console.log( ret );
}).catch((err) =>
{
    if (err) console.error( err );
});
