import { useState } from "react";
import { TextField, Button, Card, BlockStack, Text } from "@shopify/polaris";

export default function AIAnalytics() {

  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function askAI() {

    if (!question) return;

    setLoading(true);

    try {

      const res = await fetch("/api/ai/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
      });

      const json = await res.json();

      setResult(json);

    } catch (error) {

      console.error("Fetch error:", error);

      setResult({
        success: false,
        error: "Request failed"
      });

    }

    setLoading(false);

  }

  return (

    <Card>

      <BlockStack gap="400">

        <Text variant="headingMd">
          AI Analytics Assistant
        </Text>

        <TextField
          label="Ask analytics question"
          value={question}
          onChange={setQuestion}
          autoComplete="off"
        />

        <Button
          variant="primary"
          loading={loading}
          onClick={askAI}
        >
          Ask
        </Button>

        {result && (

          <Card background="bg-surface-secondary">

            <BlockStack gap="200">

              {result.sql && (
                <Text as="pre">
                  SQL: {result.sql}
                </Text>
              )}

              {result.data && (
                <Text as="pre">
                  {JSON.stringify(result.data, null, 2)}
                </Text>
              )}

              {result.error && (
                <Text tone="critical">
                  {result.error}
                </Text>
              )}

            </BlockStack>

          </Card>

        )}

      </BlockStack>

    </Card>

  );

}