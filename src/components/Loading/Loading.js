import React, { useEffect, useRef, useState } from 'react'
import { Spin } from 'antd';

const FullPageLoading = ({ opacity = 1 }) => {
    return (<>
        <div className="full-page-loading" style={{ backgroundColor: `rgba(234, 234, 234, ${opacity})` }}>
            <Spin size="large"/>
        </div>
    </>)
}
export default FullPageLoading;