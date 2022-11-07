import React from "react";
import Particles from "react-tsparticles";
import particlesConfig from "./config/particles-config";

import { useCallback } from "react"





const ParticlesBackground = () => {

    return (
        <Particles
            id="tsparticles"
            style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: "0",
                left: "0"
            }}
            params={particlesConfig}
        />
    );
};

export default ParticlesBackground;