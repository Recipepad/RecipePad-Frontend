import React from 'react';
import SmileOutlined from '@ant-design/icons/SmileOutlined'

function Footer() {
  return (
    <div
      style={{
        height: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
      }}
    >
      <p>
        {' '}
        Happy Recipes Sharing <SmileOutlined type='smile' />
      </p>
      <p>Have question? email us at help@RecipePad.com</p>
    </div>
  );
}

export default Footer;
