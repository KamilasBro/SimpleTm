import React from 'react'
import addImg from '../../images/add.png'
import searchImg from '../../images/search.png'
import Button from 'react-bootstrap/Button';
import "./sidebar.scss"
const Sidebar: React.FC=()=> {
  return (
    <section className='sidebar d-flex align-items-center justify-content-between py-3 px-5'>
      <div className='d-flex align-items-center'>
      <h4 className='p-0 m-0'>Explore Tasks</h4>
      <div className='input-wrap mx-5 d-flex align-items-center justify-content-between'>
        <input placeholder='Search' className='w-100'/>
        <Button variant='none' className='search-btn'><img src={searchImg} alt='searchImg'/></Button>
      </div>
      </div>
      <Button variant='none' className='add-btn d-flex align-items-center'>
        <img src={addImg} alt='add-section'/>
        <span className='btn-text'>Add Section</span>
      </Button>
    </section>
  )
}
export default Sidebar;
