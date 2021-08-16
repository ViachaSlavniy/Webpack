import * as $ from 'jquery'
import Post from '@models/Post'
// import json from './assets/json.json'
// import xml from './assets/data.xml'
// import csv from './assets/data.csv'
import React from 'react'
import {render} from 'react-dom'
import webpackLogo from './assets/webpack-logo'
import './babel'
import './styles/styles.css'
import './styles/less.less'
import './styles/scss.scss'

const post = new Post('Webpack post title', webpackLogo)
$('pre').addClass('code').html(post.toString())

const App = () => {
    return (
        <>
            <div className="container">
                <h1>My HTML</h1>
                <hr/>
                <div className="logo" />
                <hr/>
                <pre/>
                <hr/>
                <div className="box">
                    <h2>LESS</h2>
                </div>
                <hr/>
                <div className="card">
                    <h2>SCSS</h2>
                </div>
            </div>
        </>
    )
}

render(
    <App/>
    , document.getElementById('app'))

// console.log('Post to string', post.toString())
// console.log('JSON', json)
// console.log('XML', xml)
// console.log('CSV', csv)