import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";
import Snackbar from "@mui/material/Snackbar";

const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState(0);
  const [open, setOpen] = useState(false);

  const { handleRegister, handleLogin } = useContext(AuthContext);

  let handleAuth = async () => {
    try {
      if (formState === 0) {
        let result = await handleLogin(username, password) ;
        console.log(result)
        setMessage(result)
        setOpen(true)
        setError("")
      }
      if (formState === 1) {
        let result = await handleRegister(name, username, password);
        console.log(result)
        setMessage(result)
        setOpen(true)
        setError("")
        setFormState(0)
        setName("")
        setUsername("")
        setPassword("")
      }
    } catch (err) {
      let message = (err.response.data.message);
      setError(message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={10}
          square
          sx={{
            flexBasis: {
              xs: "100%", // xs = 12 columns → 100%
              sm: "66.6667%", // sm = 8/12 columns → 66.67%
              md: "41.6667%", // md = 5/12 columns → 41.67%
            },
            maxWidth: {
              xs: "100%",
              sm: "66.6667%",
              md: "41.6667%",
            },
            backgroundImage:
              "url(https://media.istockphoto.com/id/1761821569/photo/an-original-light-background-image-for-creative-work-on-the-theme-of-a-modern-office.jpg?s=612x612&w=0&k=20&c=2FhnV0eINOUsCkB1tSF_m9sNBAfCB57BkN0yZjIaQMA=)",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, mb: 3, bgcolor: "primary.main" }}>
              <PersonIcon />
            </Avatar>

            <div>
              <Button
                variant={formState === 0 ? "contained" : ""}
                onClick={() => {
                  setFormState(0);
                }}
              >
                Login
              </Button>
              <Button
                variant={formState === 1 ? "contained" : ""}
                onClick={() => {
                  setFormState(1);
                }}
              >
                Register
              </Button>
            </div>

            <Box component="form" noValidate sx={{ mt: 1 }}>
              {formState === 1 ? (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="full-name"
                  label="Full name"
                  name="full-name"
                  value={name}
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <></>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={password}
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p style={{color: "red"}}>{error}</p>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleAuth}
              >
                {formState === 0 ? "Login" : "Register"}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
            flexBasis: {
              sm: "33.3333%", // 4/12
              md: "58.3333%", // 7/12
            },
            maxWidth: {
              sm: "33.3333%",
              md: "58.3333%",
            },
            height: "100%", // Optional, for layout consistency
            backgroundImage:
              "url(https://videos.openai.com/vg-assets/assets%2Ftask_01k02c5stqepwrz5ae3pkjspfa%2F1752426610_img_0.webp?st=2025-07-13T15%3A16%3A59Z&se=2025-07-19T16%3A16%3A59Z&sks=b&skt=2025-07-13T15%3A16%3A59Z&ske=2025-07-19T16%3A16%3A59Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=IIebqgGGTcodAiMvEdT6FXvaBDiwbZUsuCR9j9VwvpA%3D&az=oaivgprodscus)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.1)", // Adjust opacity here
              zIndex: 1,
            }}
          />
        </Grid>
      </Grid>

            <Snackbar open={open} autoHideDuration={4000} message={message}
            />

    </ThemeProvider>
  );
}
