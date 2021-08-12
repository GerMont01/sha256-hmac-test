//Loading the required modules in node.js
var crypto = require('crypto');
var fs = require('fs');
let testkey = '187a7687678b7887ff31244121ab45c1'
const encrypt = (filename, algorithm) => {
    try {

        //creating hash object
        var hmac  = crypto.createHmac(algorithm, testkey);

        // reading the content of the file

        var file_data = fs.ReadStream(filename);
        
        //passing the data to be hashed
        file_data.on('data', function(data) {
            console.log(data)
            hmac.update(data)
        })

        //Creating the hash in the required format and writing it in file
        file_data.on('end', function() {
            var gen_hmac = hmac.digest('hex')
            console.log('Hash generated using ' + algorithm + ' \nHashed output is :  ' + gen_hmac + ' \nFile name is :  ' + filename);
            fs.writeFileSync(filename, gen_hmac);
        })
    } catch(error) {
        console.log(error);
        console.log('Please provide algorithm and file name with the following format:\n\t-c <algorithm_name> -f <file_name>');
    } 
}
 

var algorithm = '';
var filename = '';
for (let i=2;i<process.argv.length;i++){
    if (process.argv[i] === "-c"){
        algorithm = process.argv[i+1];
    }
    if (process.argv[i] === "-f"){
        filename = process.argv[i+1];
    } 
}

if (process.argv.some(alg => alg === '-c') && process.argv.some(alg => alg === '-f')){
    encrypt(filename, algorithm);
} else {
    console.log('Please provide algorithm and file name with the following format:\n\t-c <algorithm_name> -f <file_name>')
}