"use client";
import data from "../data/data.json";
import { Container, Typography, Box, Button } from "@mui/material/";
import Card from "../components/Card";
import CustomButton from "@/components/CustomButton";

// Assuming CardFeature is like this
interface CardFeature {
  title: string;
  timestamp: string;
  description: string;
  cost: string;
}

export default function Home() {
  return (
    <>
      <Container
        style={{
          display: "flex",
          gap: 60,
        }}
        sx={{
          alignItems: "flex-start",
          marginTop: 8,
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 13,
          }}
          sx={{
            marginBottom: 25,
            width: {
              xs: "100%",
              lg: "55%",
            },
          }}
        >
          <Box sx={{ width: "100%" }}>
            {data.headings.map((heading, index) => {
              const features = data[heading.heading as keyof typeof data] as CardFeature[]; // Type assertion

              return (
                <Box
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 10,
                    marginBottom: 30,
                  }}
                  sx={{ width: "100%" }}
                >
                  <Typography
                    id={`${heading.heading}`}
                    fontSize={"26px"}
                    style={{ fontWeight: "bold" }}
                  >
                    {heading.heading}
                  </Typography>
                  <Typography fontWeight={500} color={"#6c6c6c"}>
                    {heading.description}
                  </Typography>

                  {features.map((feature, featureIndex) => (
                    <Card key={featureIndex} feature={feature} />
                  ))}
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box
          style={{
            height: "540px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid",
            borderRadius: 7,
            borderColor: "#d3d3d3",
            padding: 25,
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
          }}
          sx={{
            display: {
              xs: "none",
              lg: "flex",
            },
          }}
        >
          <Box style={{ width: "100%", display: "flex", gap: 25 }}>
            <img
              src="https://images.fresha.com/locations/location-profile-images/142166/1872877/ce7e2d58-7229-4eab-abaf-6719cb4fd81f.jpg?class=gallery-modal-large&dpr=2&watermark=true"
              style={{
                width: 80,
                height: 80,
                objectFit: "cover",
                borderRadius: 7,
              }}
              alt="Salon"
            />

            <Box>
              <Typography variant="h6" fontWeight={"bold"}>
                H2 Salon Brooklyn
              </Typography>
              <Typography variant="subtitle1" fontWeight={"bold"}>
                4.9{" "}
                <span style={{ filter: "grayscale(100%) brightness(0%) " }}>
                  ⭐⭐⭐⭐⭐
                </span>
                (4,105)
              </Typography>
              <Typography fontWeight={"medium"} color={"#7b7b7b"}>
                Brooklyn, Stuyvesant Heights, New York
              </Typography>
            </Box>
          </Box>

          <CustomButton text="Continue"></CustomButton>
        </Box>
      </Container>
    </>
  );
}
