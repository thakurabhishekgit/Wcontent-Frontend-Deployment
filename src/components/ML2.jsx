import React, { useState } from "react";
import styled from "styled-components";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyAFXOKE8qMD6tECr9A9JT9OMPKFcrQIvp4";
const genAI = new GoogleGenerativeAI(apiKey);
// Slide Components with Prediction Info (unchanged)
const Slide1 = () => (
  <Slide>
    <Card>
      <TextContent>
        <h2>Channel Age Insights</h2>
        <p>
          Channel Age represents the duration since a YouTube channel was
          created. It is typically measured in months or years.
        </p>
        <PredictionInfo>
          <strong>Prediction Info:</strong> Estimated views could be around
          22,301.
        </PredictionInfo>
      </TextContent>
      <SlideImage
        src="https://images.unsplash.com/photo-1673648954658-212203f00a0d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGNvbnRlbnQlMjBjcmVhdG9yfGVufDB8fDB8fHww"
        alt="Welcome"
      />
    </Card>
  </Slide>
);

const Slide2 = () => (
  <Slide>
    <Card>
      <TextContent>
        <h2>Upload Your Channel Statistics</h2>
        <p>
          Provide key details such as your subscriber count, average views, and
          engagement rate to get an accurate prediction of your future reach.
        </p>
        <PredictionInfo>
          <strong>Prediction Info:</strong> Estimated views could be around
          22,301.
        </PredictionInfo>
      </TextContent>
      <SlideImage
        src="https://img.freepik.com/free-vector/facebook-background-with-likes-hearts_23-2147857749.jpg?t=st=1741100084~exp=1741103684~hmac=42458e68e562ac0cd44340264309bc2b66eef2b67ee4e08cfda1f756617530d3&w=900"
        alt="Welcome"
      />
    </Card>
  </Slide>
);

const Slide3 = () => (
  <Slide>
    <Card>
      <TextContent>
        <h2>Analyze Your Content Performance</h2>
        <p>
          Our system evaluates the performance of your previous videos and
          suggests improvements for maximizing reach and engagement.
        </p>
        <PredictionInfo>
          <strong>Prediction Info:</strong> Estimated views could be around
          22,301.
        </PredictionInfo>
      </TextContent>
      <SlideImage
        src="https://img.freepik.com/premium-vector/characters-holding-like-notifications-male-female-followers-gives-like-networks-people-with-hearts-thumb-up_1016-14497.jpg?w=1800"
        alt="Welcome"
      />
    </Card>
  </Slide>
);

const Slide4 = () => (
  <Slide>
    <Card>
      <TextContent>
        <h2>Identify Trending Topics</h2>
        <p>
          Discover trending topics in your niche to optimize your content and
          gain higher visibility.
        </p>
        <PredictionInfo>
          <strong>Prediction Info:</strong> Estimated views could be around
          22,301.
        </PredictionInfo>
      </TextContent>
      <SlideImage
        src="https://img.freepik.com/free-vector/person-addicted-social-media_23-2148392550.jpg?t=st=1741100141~exp=1741103741~hmac=916d46ac72ef2a0ce3a4c90718602dd3fe9fd6f97ba3cb5e2db49f9b28a0bc67&w=1380"
        alt="Welcome"
      />
    </Card>
  </Slide>
);

const Slide5 = () => (
  <Slide>
    <Card>
      <TextContent>
        <h2>Predict Your Future Growth</h2>
        <p>
          Based on your current metrics, our model forecasts your future reach,
          helping you strategize better content plans.
        </p>
        <PredictionInfo>
          <strong>Prediction Info:</strong> Estimated views could be around
          22,301.
        </PredictionInfo>
      </TextContent>
      <SlideImage
        src="https://img.freepik.com/free-vector/social-media-logo-collection_69286-192.jpg?t=st=1741100091~exp=1741103691~hmac=f2a9ed3a19780178f623029b9160e2f787e137bf1418bc42258585d40e6b4e53&w=1800"
        alt="Welcome"
      />
    </Card>
  </Slide>
);

const Slide6 = () => (
  <Slide>
    <Card>
      <TextContent>
        <h2>Optimize Your Content Strategy</h2>
        <p>
          Leverage AI-powered insights to refine your content approach and
          increase audience engagement.
        </p>
        <PredictionInfo>
          <strong>Prediction Info:</strong> Estimated views could be around
          22,301.
        </PredictionInfo>
      </TextContent>
      <SlideImage
        src="https://img.freepik.com/free-vector/realistic-multimedia-player-template_23-2148130954.jpg?t=st=1741099523~exp=1741103123~hmac=83a9920ee65d9d5d6fce92a9dfd54eca3ddb964f769d5fdacc5aaa6cf8bdf538&w=900"
        alt="Welcome"
      />
    </Card>
  </Slide>
);

// Other slides (Slide2, Slide3, etc.) remain unchanged...

const Ml2 = () => {
  const [inputData, setInputData] = useState({
    channel_age: "",
    subscriber_count: "",
    total_videos: "",
    total_views: "",
    average_likes: "",
    average_comments: "",
    average_shares: "",
    upload_frequency: "",
    video_quality_score: "",
    social_media_followers: "",
    content_type: "",
    target_audience_age_group: "",
    target_audience_interests: "",
    advertising_spend: "",
  });

  const [predictions, setPredictions] = useState(null);
  const [error, setError] = useState(null);
  const [geminiResponse, setGeminiResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [tipsLoading, setTipsLoading] = useState(false);

  const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6];

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const getGeminiPrediction = async (inputData) => {
    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });

    const prompt = `
      Based on the following YouTube channel metrics, predict the expected performance metrics.
      Return ONLY a JSON object with the following structure:
      {
        "predicted_views": number,
        "predicted_likes": number,
        "predicted_comments": number,
        "predicted_average_shares": number,
        "predicted_subscribers": number
      }
      
      Channel Metrics:
      ${JSON.stringify(inputData, null, 2)}
      
      Provide realistic predictions based on industry standards for similar channels.
      Round all numbers to 2 decimal places.
      These should be actual predictions, not dummy data.
    `;

    try {
      const result = await chatSession.sendMessage(prompt);
      const responseText = result.response.text();

      // Extract JSON from the response
      const jsonStart = responseText.indexOf("{");
      const jsonEnd = responseText.lastIndexOf("}") + 1;
      const jsonString = responseText.slice(jsonStart, jsonEnd);

      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Gemini API error:", error);
      throw new Error("Failed to get predictions from Gemini");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setShowTips(false);
    setGeminiResponse({});

    try {
      const predictions = await getGeminiPrediction(inputData);
      setPredictions(predictions);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getImprovementTips = async (metric) => {
    setTipsLoading(true);
    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });

    const context = {
      content_type: inputData.content_type,
      subscriber_count: inputData.subscriber_count,
      target_audience_age_group: inputData.target_audience_age_group,
      target_audience_interests: inputData.target_audience_interests,
      currentValue: predictions ? predictions[`predicted_${metric}`] : "N/A",
      allMetrics: inputData,
    };

    const prompt = `
      As a YouTube growth expert, provide specific, actionable tips to improve ${metric} for:
      
      Channel Type: ${context.content_type}
      Current ${metric}: ${context.currentValue}
      Subscribers: ${context.subscriber_count}
      Target Audience: ${context.target_audience_age_group}
      Audience Interests: ${context.target_audience_interests}
      
      Provide 5-7 detailed strategies including:
      1. Content optimization tips
      2. Engagement techniques
      3. Promotion strategies
      4. Best posting times
      5. Collaboration ideas
      
      Format as markdown with clear headings and bullet points.
      Base suggestions on current channel metrics:
      ${JSON.stringify(context.allMetrics, null, 2)}
    `;

    try {
      const result = await chatSession.sendMessage(prompt);
      return result.response.text();
    } catch (error) {
      console.error("Gemini API error:", error);
      return "Failed to get improvement suggestions. Please try again.";
    } finally {
      setTipsLoading(false);
    }
  };

  const handleGetTips = async () => {
    setShowTips(true);
  };

  const handleMetricTips = async (metric) => {
    const tips = await getImprovementTips(metric);
    setGeminiResponse((prev) => ({ ...prev, [metric]: tips }));
  };

  return (
    <Container>
      <Content>
        <SlidesContainer>
          {slides.map((SlideComponent, index) => (
            <SlideComponent key={index} />
          ))}
        </SlidesContainer>

        <Form onSubmit={handleSubmit}>
          <FormHeader>YouTube Performance Predictor</FormHeader>
          {Object.keys(inputData).map((key) => (
            <FormGroup key={key}>
              <Label htmlFor={key}>
                {key.replace(/_/g, " ").toUpperCase()}
              </Label>
              <Input
                type="text"
                id={key}
                name={key}
                value={inputData[key]}
                onChange={handleChange}
                placeholder={`Enter ${key.replace(/_/g, " ")}`}
                required
              />
            </FormGroup>
          ))}
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Predicting..." : "Get Predictions"}
          </SubmitButton>
        </Form>
      </Content>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {predictions && (
        <Results>
          <ResultsHeader>Prediction Results</ResultsHeader>

          {!showTips ? (
            <>
              <ResultsGrid>
                <ResultCard>
                  <CardTitle>Predicted Views</CardTitle>
                  <CardValue>
                    {predictions.predicted_views.toFixed(2)}
                  </CardValue>
                </ResultCard>
                <ResultCard>
                  <CardTitle>Predicted Likes</CardTitle>
                  <CardValue>
                    {predictions.predicted_likes.toFixed(2)}
                  </CardValue>
                </ResultCard>
                <ResultCard>
                  <CardTitle>Predicted Comments</CardTitle>
                  <CardValue>
                    {predictions.predicted_comments.toFixed(2)}
                  </CardValue>
                </ResultCard>
                <ResultCard>
                  <CardTitle>Predicted Shares</CardTitle>
                  <CardValue>
                    {predictions.predicted_average_shares.toFixed(2)}
                  </CardValue>
                </ResultCard>
                <ResultCard>
                  <CardTitle>Predicted Subscribers</CardTitle>
                  <CardValue>
                    {predictions.predicted_subscribers.toFixed(2)}
                  </CardValue>
                </ResultCard>
              </ResultsGrid>

              <TipsButtonContainer>
                <TipsButton onClick={handleGetTips}>
                  Need tips to improve your metrics?
                </TipsButton>
              </TipsButtonContainer>
            </>
          ) : (
            <TipsSection>
              <TipsHeader>
                Improvement Strategies for Your {inputData.content_type} Channel
              </TipsHeader>

              <MetricSelector>
                <MetricButton
                  onClick={() => handleMetricTips("views")}
                  disabled={tipsLoading}
                >
                  {tipsLoading && geminiResponse.views
                    ? "Updating..."
                    : "Views Tips"}
                </MetricButton>
                <MetricButton
                  onClick={() => handleMetricTips("likes")}
                  disabled={tipsLoading}
                >
                  {tipsLoading && geminiResponse.likes
                    ? "Updating..."
                    : "Likes Tips"}
                </MetricButton>
                <MetricButton
                  onClick={() => handleMetricTips("comments")}
                  disabled={tipsLoading}
                >
                  {tipsLoading && geminiResponse.comments
                    ? "Updating..."
                    : "Comments Tips"}
                </MetricButton>
                <MetricButton
                  onClick={() => handleMetricTips("average_shares")}
                  disabled={tipsLoading}
                >
                  {tipsLoading && geminiResponse.shares
                    ? "Updating..."
                    : "Shares Tips"}
                </MetricButton>
                <MetricButton
                  onClick={() => handleMetricTips("subscribers")}
                  disabled={tipsLoading}
                >
                  {tipsLoading && geminiResponse.subscribers
                    ? "Updating..."
                    : "Subscribers Tips"}
                </MetricButton>
              </MetricSelector>

              {Object.keys(geminiResponse).length > 0 && (
                <TipsContainer>
                  {Object.entries(geminiResponse).map(([metric, tips]) => (
                    <MetricTips key={metric}>
                      <TipsTitle>
                        {metric.replace(/_/g, " ").toUpperCase()} IMPROVEMENT
                        TIPS
                      </TipsTitle>
                      <TipsContent
                        dangerouslySetInnerHTML={{
                          __html: tips.replace(/\n/g, "<br/>"),
                        }}
                      />
                    </MetricTips>
                  ))}
                </TipsContainer>
              )}

              <BackButton onClick={() => setShowTips(false)}>
                Back to Predictions
              </BackButton>
            </TipsSection>
          )}
        </Results>
      )}
    </Container>
  );
};

// Add these styled components to your existing styles
const TipsButtonContainer = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const TipsButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const TipsSection = styled.div`
  margin-top: 2rem;
`;

const TipsHeader = styled.h3`
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const MetricSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const MetricButton = styled.button`
  background-color: ${(props) => (props.disabled ? "#cccccc" : "#2196F3")};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) => (props.disabled ? "#cccccc" : "#0b7dda")};
  }
`;

const TipsContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 2rem;
`;

const MetricTips = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const TipsTitle = styled.h4`
  color: #333;
  margin-bottom: 0.5rem;
`;

const TipsContent = styled.div`
  color: #555;
  line-height: 1.6;
`;

const BackButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  margin: 0 auto;

  &:hover {
    background-color: #d32f2f;
  }
`;

const Container = styled.div`
  font-family: "Poppins", sans-serif;
  padding: 2rem;
  background: linear-gradient(135deg, #0f0f0f, #1a1a1a);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
`;

const Content = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
`;

const SlidesContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Slide = styled.div`
  background: #2a2a2a;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  }
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  gap: 1.5rem;
`;

const TextContent = styled.div`
  flex: 1;
`;

const PredictionInfo = styled.p`
  color: #ccc;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const SlideImage = styled.img`
  width: 40%;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid #444;
`;

const Form = styled.form`
  width: 50%;
  background: #2a2a2a;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 2rem;
`;

const FormHeader = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #fff;
`;

const FormGroup = styled.div`
  margin-bottom: 1.2rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #ccc;
  margin-bottom: 0.5rem;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #444;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #333;
  color: #fff;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Results = styled.div`
  margin-top: 2rem;
  width: 100%;
  max-width: 1200px;
  background: #2a2a2a;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const ResultsHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #fff;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const ResultCard = styled.div`
  background: #333;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #ccc;
`;

const CardValue = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
`;

const GeminiResponse = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #ccc;
`;

const ErrorMessage = styled.div`
  color: #ff4d4f;
  margin-top: 1rem;
  font-size: 0.9rem;
`;

export default Ml2;
