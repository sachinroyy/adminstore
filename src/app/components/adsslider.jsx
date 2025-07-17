"use client"
import Image from "next/image";
import { useTheme, useMediaQuery } from "@mui/material";

export default function AdSlider() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    return (
        <div style={{
            width: "100%", 
            height: isMobile ? "100px" : "150px",
            position: "relative", 
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Image 
                src="/images/adsslider.png"
                alt="Ad Slider"
                fill
                style={{
                    objectFit: "contain",
                    width: "100%",
                    padding: isMobile ? "14px" : "20px",
                    boxSizing: "border-box"
                }}
            />
        </div>
    );
}