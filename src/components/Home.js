import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 50px;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  font-size: 3em;
  margin-bottom: 20px;
  color: #333;
`;

const Paragraph = styled.p`
  font-size: 1.2em;
  margin-bottom: 20px;
  color: #666;
  line-height: 1.6;
`;

const Highlight = styled.span`
  color: #007BFF;
  font-weight: bold;
`;

const Home = () => {
  return (
    <Container>
      <Title>Simple RNN for Time Series Site</Title>
      <Paragraph>
        Welcome to our website! We specialize in providing solutions for time series analysis using <Highlight>Recurrent Neural Networks (RNNs)</Highlight>. Whether you're looking to predict future trends or analyze historical data, our tools can help you achieve your goals.
      </Paragraph>
      <Paragraph>
        Our services include data visualization, model training, and deployment of predictive models. Explore our site to learn more about what we offer and how we can assist you in your time series analysis journey.
      </Paragraph>
      <Paragraph>
        Feel free to <Highlight>contact us</Highlight> if you have any questions or need further assistance.
      </Paragraph>
    </Container>
  );
};

export default Home;