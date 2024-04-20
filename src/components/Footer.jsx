import React from 'react'
import FooterInfo from './FooterInfo'

export default function Footer() {
    return (
        <div id="footer">
            <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 p-4">
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                    <h1 className="text-2xl font-bold barand-name-color">Dribbble</h1>
                    <p></p>
                    <div class="icons">
                        <a href="#"><i class="footer-icon-1 fa-solid fa-basketball"></i></a>
                        <a href="#"><i class="footer-icon twitter fa-brands fa-twitter"></i></a>
                        <a href="#"><i class="footer-icon facebook fa-brands fa-facebook"></i></a>
                        <a href="#"><i class="footer-icon pinterest fa-brands fa-pinterest"></i></a>
                    </div>
                </div>
                <FooterInfo heading="For designers" >
                    <li>Go Pro!</li>
                    <li>Explore design work</li>
                    <li>Design blog</li>
                    <li>Overtime podcast</li>
                    <li>Playoffs</li>
                    <li>Weekly Warm-Up</li>
                    <li>Refer a Friend</li>
                    <li>Code of conduct</li>
                </FooterInfo>
                <FooterInfo heading="Hire designers">
                    <li>Post a job opening</li>
                    <li>Post a freelance</li>
                    <li>project</li>
                    <li>Search for designers</li>
                    <h3 className="text-sm font-bold">Brands</h3>
                    <li>Advertise with us</li>
                </FooterInfo>
                <FooterInfo heading="Company">
                    <li>About</li>
                    <li>Careers</li>
                    <li>Support</li>
                    <li>Media kit</li>
                    <li>Testimonials</li>
                    <h3 className="text-sm font-bold">API</h3>
                    <li>Terms of service</li>
                    <li>Privacy policy</li>
                    <li>Cookie policy</li>
                </FooterInfo>
                <FooterInfo heading="Directories">
                    <li>Design jobs</li>
                    <li>Designers for hire</li>
                    <li>Freelance designers for hire</li>
                    <li>Tags</li>
                    <li>Places</li>
                    <h3 className="text-sm font-bold">Design assets</h3>
                    <li>Dribbble Marketplace</li>
                    <li>Creative Market</li>
                    <li>Fontspring</li>
                    <li>Font Squirrel</li>
                </FooterInfo>
                <FooterInfo heading="Design Resources">
                    <li>Freelancing</li>
                    <li>Design Hiring</li>
                    <li>Design Portfolio</li>
                    <li>Design Education</li>
                    <li>Creative Process</li>
                    <li>Design Industry</li>
                    <li>Trends</li>
                </FooterInfo>
            </div>
        </div>
    )
}
