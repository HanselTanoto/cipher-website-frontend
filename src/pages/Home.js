import React, { Component } from 'react'

import Banner from '../components/Banner'
import CryptographyDesc from '../components/CryptographyDef'
import Carousel from '../components/Carousel'

export default class Home extends Component {
    render() {
        return (
            <div>
                <Banner />
                <Carousel />
                <CryptographyDesc />
            </div>
        )
    }
}