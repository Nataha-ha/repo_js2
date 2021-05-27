const path = require('path');

module.exports = {
    entry: './src/shop.js',
    output: {
        path: path.resolve(__dirname, 'public/js/'),
        filename: 'shop.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {loader: 'babel-loader'},
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'}, // инжектит стили из js модуля в теги <style></style>
                    {loader: 'css-loader'}, // трансформирует css файл в js модуль
                ]
            }
        ]
    }
}