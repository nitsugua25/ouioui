import React from "react";
import {ProfilePictureProps} from "@/src/types/ProfilePictureProps";



export default function ProfilePicture({
    width = 100,
    height = 100,
    border = "2px solid #000",
    }: ProfilePictureProps)

{
    return (
        <img
            src="https://example.com/profile.jpg"
            alt="Profile Picture"
            style={{
                width: width,
                height: height,
                borderRadius: Math.min(width, height) / 2,
                border: border,
            }}
            >
        </img>
    );

}