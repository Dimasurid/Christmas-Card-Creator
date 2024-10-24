import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaSnowflake, FaTree, FaGift } from "react-icons/fa";

const ChristmasTheme = styled("div")(({ theme }) => ({
  backgroundColor: "#f0f0f0",
  minHeight: "100vh",
  color: "#2c3e50",
  position: "relative",
  overflow: "hidden",
}));

const SnowfallAnimation = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: "none",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-10px",
    left: 0,
    right: 0,
    bottom: 0,
    background: "url('https://images.unsplash.com/photo-1542793836-6791c6a533d9') repeat",
    animation: "snowfall 10s linear infinite",
    opacity: 0.5,
  },
  "@keyframes snowfall": {
    "0%": { backgroundPosition: "0px 0px" },
    "100%": { backgroundPosition: "0px 1000px" },
  },
});

const ChristmasButton = styled(Button)({
  backgroundColor: "#c0392b",
  color: "#ffffff",
  borderRadius: "25px",
  padding: "10px 20px",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#e74c3c",
    transform: "scale(1.05)",
  },
});

const ChristmasCard = styled(Card)({
  backgroundColor: "#ffffff",
  borderRadius: "15px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 6px 25px rgba(0, 0, 0, 0.15)",
  },
});

const ChristmasCardCreator = () => {
  return (
    <ChristmasTheme>
      <SnowfallAnimation />
      <AppBar position="static" sx={{ backgroundColor: "#2c3e50" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: "'Lobster', cursive" }}>
            Christmas Card Creator
          </Typography>
          <RouterLink to="/login">
            <ChristmasButton variant="contained" startIcon={<FaGift />}>
              Get Started
            </ChristmasButton>
          </RouterLink>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontFamily: "'Mountains of Christmas', cursive", color: "#c0392b" }}>
              Create Magical Christmas Cards
            </Typography>
            <Typography variant="h5" paragraph sx={{ mb: 4 }}>
              Spread joy this holiday season with our easy-to-use Christmas Card Creator. Design personalized cards that will warm hearts and bring smiles.
            </Typography>
            <RouterLink to="/register">
              <ChristmasButton variant="contained" size="large" startIcon={<FaTree />}>
                Start Creating
              </ChristmasButton>
            </RouterLink>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1543589077-47d81606c1bf"
              alt="Christmas Card Sample"
              sx={{
                width: "100%",
                borderRadius: "15px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              }}
            />
          </Grid>
        </Grid>
        <Typography variant="h4" component="h2" align="center" sx={{ mt: 12, mb: 6, fontFamily: "'Lobster', cursive", color: "#2c3e50" }}>
          Features
        </Typography>
        <Grid container spacing={4}>
          {[
            { icon: <FaSnowflake />, title: "Festive Templates", description: "Choose from a wide range of beautifully designed Christmas templates." },
            { icon: <FaTree />, title: "Customization", description: "Personalize your cards with photos, text, and festive decorations." },
            { icon: <FaGift />, title: "Easy Sharing", description: "Share your creations digitally or order high-quality prints." },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <ChristmasCard>
                <CardContent sx={{ textAlign: "center" }}>
                  <Box sx={{ fontSize: 60, color: "#c0392b", mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1">{feature.description}</Typography>
                </CardContent>
              </ChristmasCard>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{ bgcolor: "#2c3e50", color: "#ffffff", py: 3, mt: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" align="center">
            © 2023 Christmas Card Creator. Spread joy responsibly.
          </Typography>
        </Container>
      </Box>
    </ChristmasTheme>
  );
};

export default ChristmasCardCreator;