import { useState } from "react";
import { Outlet } from "react-router-dom";

function Layout(props) {
  const isSystemDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [isDark, setIsDark] = useState(isSystemDark);

  const lightTheme = {
    backgroundColor: "white",
    color: "black",
  };

  const darkTheme = {
    backgroundColor: "black",
    color: "white",
  };

  return (
    <div style={isDark ? darkTheme : lightTheme} className="wrapper">
      <div className="container">
        {/* header */}
        <div className="header">
          <div>
            <i className="fa-solid fa-book"></i>
          </div>

          <div className="toggle">
            <div className="font">
              <select name="fonts" id="fonts" style={isDark ? {color:"white"} : null}>
                <option value="Serif">Serif</option>
                <option value="San serif">San Serif</option>
                <option value="Monospace">Monospace</option>
              </select>
            </div>
            <div className="mode">
              <div
                className={`switch-container ${isDark ? " active" : ""}`}
                onClick={() => setIsDark((toggle) => !toggle)}
              >
                <div className={`switch ${isDark ? " active" : ""}`}></div>
              </div>
              <i className="fa-regular fa-moon"></i>
            </div>
          </div>
        </div>
        <div className="form">
          <input type="search" onChange={(e) => props.handleChange(e)} />
          <button type="button" className="search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        {/* result */}
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
