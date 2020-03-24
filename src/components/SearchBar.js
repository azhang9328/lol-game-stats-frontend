import React from 'react'
import {Input as Search, Form, Button} from 'antd'

const SearchBar = props => {
    return(
        <>
            <Search style={{width: '30%', margin: '5px'}} placeholder="Search LoL Game ID"/>
            <Button loading={props.searchLoading} htmlType='submit' onClick={props.enterSearchLoading}>
                Search
            </Button>
      </>
    )
}

export default SearchBar