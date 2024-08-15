"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { AppBar as MuiAppBar, Box, Typography, IconButton, Divider, useMediaQuery, useTheme } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseButton from "./CloseButton";
import data from "../data/data.json";

interface AppbarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  children: ReactNode;
}

const Appbar: React.FC<AppbarProps> = ({ children, activeCategory, setActiveCategory }) => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [visibleHeadings, setVisibleHeadings] = useState<string[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4);

  const updateVisibleHeadings = (start: number, end: number) => {
    setVisibleHeadings(data.headings.slice(start, end + 1).map(h => h.heading));
  };

  useEffect(() => {
    if (isMediumScreen) {
      updateVisibleHeadings(startIndex, endIndex);
    } else {
      setVisibleHeadings(data.headings.map(h => h.heading));
    }
  }, [startIndex, endIndex, isMediumScreen]);

  const handleScroll = () => {
    const headerHeight = 180; 
    let activeHeading = "";

    data.headings.forEach((heading) => {
      const section = document.getElementById(heading.heading);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - headerHeight && rect.bottom > headerHeight) {
          activeHeading = heading.heading;
        }
      }
    });

    if (activeHeading && activeCategory !== activeHeading) {
      setActiveCategory(activeHeading);
      const index = data.headings.findIndex(h => h.heading === activeHeading);
      const newStartIndex = Math.max(0, index);
      const newEndIndex = Math.min(data.headings.length - 1, newStartIndex + 4);

      setStartIndex(newStartIndex);
      setEndIndex(newEndIndex);
    }

    if (!isMediumScreen) {
      // Synchronize horizontal scroll with vertical scroll
      const container = categoriesRef.current;
      if (container) {
        const scrollAmount = window.scrollY / 2; 
        container.scrollLeft = scrollAmount;
      }
    }
  };

  const handlePagination = (direction: "left" | "right") => {
    const container = categoriesRef.current;
    if (container) {
      const containerWidth = container.clientWidth;
      const headingWidth = containerWidth / 2; 
      const scrollAmount = direction === "right" ? headingWidth : -headingWidth;

      if (direction === "right" && endIndex < data.headings.length - 1) {
        const newEndIndex = Math.min(data.headings.length - 1, endIndex + 2);
        const newStartIndex = Math.max(0, newEndIndex - 4);
        setStartIndex(newStartIndex);
        setEndIndex(newEndIndex);

        // Smoothly scroll to the right
        container.scrollBy({
          left: scrollAmount,
          behavior: 'smooth',
        });
      } else if (direction === "left" && startIndex > 0) {
        const newStartIndex = Math.max(0, startIndex - 2);
        const newEndIndex = Math.min(data.headings.length - 1, newStartIndex + 4);
        setStartIndex(newStartIndex);
        setEndIndex(newEndIndex);

        // Smoothly scroll to the left
        container.scrollBy({
          left: scrollAmount,
          behavior: 'smooth',
        });
      }
    }
  };

  const scrollToHeading = (heading: string) => {
    const section = document.getElementById(heading);
    if (section) {
      const headerOffset = 245; 
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
      });

      setActiveCategory(heading);

      const index = data.headings.findIndex(h => h.heading === heading);
      const newStartIndex = Math.max(0, index);
      const newEndIndex = Math.min(data.headings.length - 1, newStartIndex + 4);

      setStartIndex(newStartIndex);
      setEndIndex(newEndIndex);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeCategory, isMediumScreen]);

  return (
    <>
      <MuiAppBar
        position="sticky"
        elevation={0}
        style={{
          backgroundColor: "#fff",
          color: "black",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1 }}>
          <Box
            sx={{ width: "95%", boxSizing: "border-box", padding: "30px 0px 0px 60px" }}
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ cursor: "pointer", fontWeight: "bold", fontSize: "22px" }}>
              Select services
            </Typography>
            <CloseButton />
          </Box>
          <Divider sx={{ marginBottom: 2 }}></Divider>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "flex-start",
            padding: "10px 0",
            whiteSpace: "nowrap",
            overflowX: "auto",
            position: "relative",
            marginBottom: 2,
          }}
        >
          <Box
            ref={categoriesRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              transition: "transform 0.7s ease",
              width: {
                xs: "100%",
                md: "45%"
              },
              gap: "20px",
              alignItems: "center",
              scrollBehavior: "smooth",
              marginLeft: {
                xs: 0,
                md: 33
              },
              '&::-webkit-scrollbar': {
                display: 'none'
              },
            }}
          >
            {data.headings.map((heading, index) => (
              <Typography
                key={index}
                onClick={() => scrollToHeading(heading.heading)}
                sx={{
                  cursor: "pointer",
                  fontWeight: activeCategory === heading.heading ? "bold" : "normal",
                  color: activeCategory === heading.heading ? "white" : "black",
                  backgroundColor: activeCategory === heading.heading ? "black" : "white",
                  padding: "10px 20px",
                  borderRadius: "50px",
                  transition: "background-color 0.3s, color 0.3s",
                  display: visibleHeadings.includes(heading.heading) ? "block" : "none",
                  "&:hover": {
                    backgroundColor: activeCategory === heading.heading ? "black" : "#f0f0f0",
                    borderRadius: "50px",
                  },
                }}
              >
                {heading.heading}
              </Typography>
            ))}
          </Box>

          {isMediumScreen && (
            <Box sx={{ display: "flex", alignItems: "center", padding: "20px" }}>
              <IconButton
                onClick={() => handlePagination("left")}
                disabled={startIndex === 0}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    borderRadius: "100%",
                  },
                }}
              >
                <ArrowBackIosIcon />
              </IconButton>

              <IconButton
                onClick={() => handlePagination("right")}
                disabled={endIndex >= data.headings.length - 1}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    borderRadius: "50%",
                  },
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </MuiAppBar>

      {children}
    </>
  );
};

export default Appbar;
