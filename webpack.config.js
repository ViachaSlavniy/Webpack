const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin");


const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all" // При подключении сторонних библиотек и импорта их в ЖС файлы, выделяет их отедльный файл и подключает к нужным ЖС файлам.
        }
    }

    if (isProd) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    }

    return config
}
const filename = ext => isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`
const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {}
        },
        'css-loader'
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}
const babelOptions = preset => {
    const opts = {
        presets: ['@babel/preset-env']
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}

module.exports = {
    context: path.resolve(__dirname, 'src'), // Путь до места где лежат исходники проекта
    entry: { // Точка входа в приложение
        main: ['@babel/polyfill', './index.jsx'],
        analytics: './analytics.ts'
    },
    output: {
        filename: filename('js'), // Как будет формироваться название файла в конечной папке
        path: path.resolve(__dirname, 'dist') // Путь до конечной папки
    },
    resolve: {
        extensions: ['.js', '.json', '.png'], // Позволяет не прописывать для перечисленных разрешений, разрешения в импортах
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),
    mode: isDev ? 'development' : 'production', // Мод в котором будет происходить сборка (production, development)
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders() // Обработка происходит справа налево
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader') // Обработка происходит справа налево
            },
            {
                test: /\.s[ac]ss$/i,
                use: cssLoaders('sass-loader') // Обработка происходит справа налево
            },
            {
                test: /\.(png|svg|jpeg|)$/,
                type: 'asset/resource',
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: babelOptions()
                }
            },
            {
                test: /\.m?ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: babelOptions('@babel/preset-typescript')
                }
            },
            {
                test: /\.m?jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: babelOptions('@babel/preset-react')
                }
            }
        ]
    },
    devServer: {
        port: 4200,
        hot: isDev
    },
    devtool: isDev ? 'source-map' : 'none',
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // Определяет шаблон ХМТЛ по которому будет происходить сборка
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(), // Очищает папку выхода перед каждой сборкой
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.gif'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'), // Как будет формироваться название файла в конечной папке
            chunkFilename: "[name].css",
        })
    ]
}