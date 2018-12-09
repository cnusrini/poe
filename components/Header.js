import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () =>{
  return (
    <Menu style={{marginTop:'20px'}}>
        <Link route='/'>
          <a className='item'>POE</a>
        </Link>
      <Menu.Menu position='right'>
        <Link route='/checkDoc/chkDoc'>
          <a className='item'>chkDOC</a>
        </Link >
        <Link route='/'>
          <a className='item'>Explorer</a>
        </Link >

      </Menu.Menu>
    </Menu>
  );
};
