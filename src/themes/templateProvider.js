import React from 'react';
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

const TemplateContext = React.createContext(null);

export const TemplateProvider = ({ children }) => {
    const theme = createTheme({
        overrides: {
            MuiDrawer: {
                paperAnchorLeft: {
                    left: 75,
                    top: 19,
                    height: '95%',
                    width: '27%',
                    boxShadow: 'none'
                }
            },
            MuiBackdrop: {
                root :{
                    backgroundColor : 'unset'
                }
            }
        }
    });

    return (
        <TemplateContext.Provider>
            <ThemeProvider theme={theme}>
                {/* <CssBaseline /> */}
                {children}
            </ThemeProvider>
        </TemplateContext.Provider>
    );
}

export default TemplateProvider;
