// const Person = require('./person')

// const person1 = new Person('John', 30)

// person1.greeting()

const Logger = require('./logger')
const fs = require("fs")
const path = require("path")
const http = require('http')

const logger = new Logger()

// Create a fodlder
// const logsDir = path.join(__dirname, "/logs")

// fs.mkdir(logsDir, {}, (err) => {
//   if (fs.existsSync(logsDir))
//     console.log(`Directory ${logsDir} already exists. Folder not created`)
//   else 
//     console.log(`${logsDir} folder created`);
// });


// logger.on('message', data => {
//     // Create and write to file
//     // if(!fs.stat(path.join(logsDir, "log.txt"), (err))){
//         fs.writeFile(path.join(logsDir, "log.txt"), data, (err) => {
//             if (err) throw err;
//             // Add to a file
//             fs.appendFile(path.join(logsDir, "log.txt"), data, (err) => {
//                 if (err) throw err;
//             });
//         })        
// })

// logger.log('First log')

const server = http.createServer((request, response) => {
    // if(request.url === '/'){
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
    //         response.writeHead(200, { 'Content-Type': 'text/html' })
    //         response.end(content)
    //     })        
    // }
    // if(request.url === '/api/users'){
    //     const users = [
    //         {
    //             name: 'Bob Smith',
    //             age: 40
    //         },
    //         {
    //             name: 'John',
    //             age: 50
    //         }
    //     ]       
    //     response.writeHead(200, { 'Content-Type': 'application/json' })
    //     response.end(JSON.stringify(users))
    // }

    // Build file path
    let filePath = path.join(__dirname, 'public', request.url === '/' ? 'index.html' : request.url)
    
    // Get extension
    let extName = path.extname(filePath)
    
    // Initial content type
    let contentType = 'text/html'

    // Check extension and set content type
    switch(extName){
        case '.js':
            contentType = 'text/javascript'
            break
        case '.css':
            contentType = 'text/css'
            break
        case '.json':
            contentType = 'application/json'
            break
        case '.png':
            contentType = 'image/png'
            break
        case '.jpg':
            contentType = 'text/jpg'
            break
    }

    // Read file
    fs.readFile(filePath, (err, content) => {
        if(err){
            if(err.code == 'ENOENT'){
                // Page Not Found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    response.writeHead(200, { 'Content-Type': 'text/html' })
                    response.end(content, 'utf8')
                })
            } else {
                // Some server error (500)
                response.writeHead(500)
                response.end(`Server error: ${err.code}`)
            }
        } else {
            response.writeHead(200, { 'Content-Type': contentType })
            response.end(content, 'utf8')
        }
    })
    
    // console.log(filePath)
    // response.end()
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on ${PORT}`))


