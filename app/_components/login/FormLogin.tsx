"use client";

import { ChangeEvent, useState } from "react";

import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { ROUTE_DASHBOARD } from "@constants";
import { AuthService } from "@services";
import { encrypt, isValidEmail, notify } from "@shared/utils";

export const FormLogin = () => {
  const router = useRouter();

  const [form, setForm] = useState<{
    email: string;
    password: string;
  }>({
    email: "eduardo-266@hotmail.com",
    password: "tem2042acm1ptAA$$",
  });

  const validateCredentials = () => {
    const emailClean = form.email.trim();
    const passwordClean = form.password.trim();

    if (!emailClean) {
      return notify("Email is required");
    }

    if (!passwordClean) {
      return notify("Password is required");
    }

    if (!isValidEmail(emailClean)) {
      return notify("Email is invalid");
    }

    AuthService.login({
      email: encrypt(form.email),
      password: encrypt(form.password),
    }).then(() => router.push(ROUTE_DASHBOARD));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        fullWidth
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={form.email}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={form.password}
        onChange={handleChange}
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={validateCredentials}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};
