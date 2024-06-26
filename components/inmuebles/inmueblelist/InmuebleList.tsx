import { FC, Suspense, useRef } from "react";

import dynamic from "next/dynamic";

import { Box, Button, IconButton, Typography } from "@mui/material";

import LeftIcon from "@mui/icons-material/ChevronLeft";
import RightIcon from "@mui/icons-material/ChevronRight";

import { Inmueble } from "../../../pages/index";

import Placeholder from "../../placeholders/RecomendedIndex";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./InmuebleList.module.css";
import { useRouter } from "next/router";

const settings = {
  autoplay: false,
  arrows: false,
  slidesToShow: 4,
  slidesToScroll: 4,
  infinite: true,
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
interface Props {
  inmuebles: Inmueble[];
}
export const InmuebleList: FC<Props> = ({ inmuebles }) => {
  const InmuebleCard = dynamic(() =>
    import("../InmuebleCard").then((mod) => mod.InmuebleCard)
  );
  const sliderRef = useRef<any>(null);
  const router = useRouter();
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        minHeight: "100%",
        paddingBlock: 4,
        marginTop: -4,
      }}
    >
      <Typography
        variant="body1"
        fontWeight={"bold"}
        component="h2"
        fontSize={32}
        textAlign="center"
        sx={{ textShadow: "0 10px 32px rgba(0,0,0,0.4)", mt: 1 }}
      >
        Ver inmuebles
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", md: "100%" },
            marginInline: "auto",
            mt: 2,
            position: "relative",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              zIndex: 900,
              background: "rgba(255,255,255,1)",
              transform: "translateY(-50%)",
              "&:hover": { background: "#e1e1e1" },
            }}
            onClick={() =>
              sliderRef.current !== null
                ? sliderRef?.current.slickPrev()
                : false
            }
          >
            <LeftIcon />
          </IconButton>
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              zIndex: 900,
              background: "rgba(255,255,255,1)",
              transform: "translateY(-50%)",
              "&:hover": { background: "#e1e1e1" },
            }}
            onClick={() =>
              sliderRef.current !== null
                ? sliderRef?.current.slickNext()
                : false
            }
          >
            <RightIcon />
          </IconButton>
          {inmuebles && inmuebles.length > 0 ? (
            <Slider
              ref={sliderRef}
              {...settings}
              className={styles["slick-slider-container"]}
            >
              {inmuebles.map((inmueble) => (
                <Suspense key={inmueble.data.key} fallback={<Placeholder />}>
                  <InmuebleCard inmueble={inmueble} />
                </Suspense>
              ))}
            </Slider>
          ) : (
            <Typography color="text.secondary">
              No se encontraron inmuebles
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
              marginBottom: 5,
              flexFlow: "column wrap",
            }}
          >
            <Typography variant="body1" fontWeight={"bold"}>
              ¿Deseas ver mas inmuebles?
            </Typography>
            <Button onClick={() => router.push("/search")} variant="contained">
              Ver mas
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
