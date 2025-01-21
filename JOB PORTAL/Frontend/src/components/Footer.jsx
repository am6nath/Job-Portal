import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Divider,
  Link,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialMediaLinks = [
    { icon: <FacebookIcon />, link: "#" },
    { icon: <TwitterIcon />, link: "#" },
    { icon: <LinkedInIcon />, link: "#" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1a1a1a",
        color: "white",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Top Section */}
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
          sx={{ borderBottom: "1px solid #333", pb: 4 }}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
             Job Seeker
            </Typography>
            <Typography variant="body2" color="gray">
              Helping professionals find the right career opportunities.
            </Typography>
          </Grid>
          <Grid item xs={12} md="auto">
            <Grid container spacing={2}>
              <Grid item>
                <Link
                  href="/"
                  color="gray"
                  underline="hover"
                  sx={{
                    "&:hover": { color: "white" },
                    transition: "color 0.3s ease",
                  }}
                >
                  Home
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="/about"
                  color="gray"
                  underline="hover"
                  sx={{
                    "&:hover": { color: "white" },
                    transition: "color 0.3s ease",
                  }}
                >
                  About
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="/contact"
                  color="gray"
                  underline="hover"
                  sx={{
                    "&:hover": { color: "white" },
                    transition: "color 0.3s ease",
                  }}
                >
                  Contact
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Middle Section */}
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 4 }}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="gray">
              Email: support@digitalworkforce.com
            </Typography>
            <Typography variant="body2" color="gray">
              Phone: +1 234 567 890
            </Typography>
          </Grid>
          <Grid item xs={12} md="auto">
            {socialMediaLinks.map((link, index) => (
              <IconButton
                key={index}
                href={link.link}
                sx={{
                  color: "gray",
                  "&:hover": { color: "white" },
                  transition: "color 0.3s ease",
                }}
              >
                {link.icon}
              </IconButton>
            ))}
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "#333" }} />

        {/* Bottom Section */}
        <Box textAlign="center">
          <Typography variant="body2" color="gray">
            &copy; {currentYear} Digital Workforce Management. All rights
            reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
