import React from 'react'
import Content from './components/content';
import Header from './components/header'
import Menu from './components/menu'
import Footer from './components/footer'

function App() {
  return (
    <div>
        <Header></Header>
        <Menu></Menu>
        <Content></Content>
        <Footer/>
    </div>

  )
}

export default App;
