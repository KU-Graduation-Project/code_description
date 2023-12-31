// 좌측 Nav : CONTACT

import React from "react";
import Nav from 'C:/Users/user/Downloads/hpe-modify/hpe-example-main/my-app/src/Components/nav/Nav';
import { FaHome } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Section3 = () => {
    return (
        <div className="section3">
			<Nav/>
			<div className="section">
				<div className="education">
				<a name="target3"></a>
				<h3 className="back">
					<Link to={"/Home2"}>
						<FaHome />HOME
					</Link>
				</h3>
				<p className="major"><span>How to Get In Touch?</span></p>
				<div className="contacts">
					<br/>
					<p>🎂 2021.04.22 ~ 2023.xx.xx</p>
					<p>📞 +(82)10-xxxx-xxxx</p>
					<p>📧 xxxx@konkuk.ac.kr</p>
					<br/>
					<p>https://github.com/KU-Graduation-Project</p>
					<p>https://cafe.naver.com/maritimesmartcloth</p>
					<br/>
				</div>
			</div>
			<footer>
					<h3 className="foot">Ocean Lab</h3>
					<h3 className="foot">2023 by KCG_Ocean Lab</h3>
			</footer>
			<br/>
			</div>
        </div>
    )
}

export default Section3