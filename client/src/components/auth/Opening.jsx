import React from "react";
import { Header, Container } from "semantic-ui-react";
import { motion } from "framer-motion";

function Opening({ setEnteredApp }) {
  return (
    <>
      <motion.div
        className="auth-container_enter"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 120 }}
      >
        <Container text textAlign={"center"}>
          <Header
            as="h1"
            content="Welcome To Class Manager"
            inverted
            style={{
              fontSize: "4em",
              fontWeight: "normal",
              marginBottom: 0,
            }}
          />
          <Header
            as="h2"
            content="The ultimate class management tool that keeps students on task and engaged, and teachers free of stress!"
            inverted
            style={{
              fontSize: "1.7em",
              fontWeight: "normal",
              marginTop: "1.5em",
            }}
          />
          <motion.button
            className="btn_enter-app"
            onClick={() => setEnteredApp(true)}
            animate={{
              scale: 1.1,
              transition: {
                duration: 0.4,
                yoyo: Infinity,
              },
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 19px 5px rgba(255,255,255,0.92)",
            }}
          >
            Enter App
          </motion.button>
        </Container>
      </motion.div>
    </>
  );
}

export default Opening;
