import axios, { AxiosResponse } from "axios";

// Interfaces
interface Generation {
  id: string;
  text: string;
}

interface CohereResponse {
  id: string;
  generations: Generation[];
  prompt: string;
  meta: {
    api_version: {
      version: string;
    };
  };
}

// Cohere class definition
export class Cohere {
  private apiKey: string;
  private text: string;

  // Constructor for the Cohere class
  constructor(apiKey: string, text: string) {
    this.apiKey = apiKey;
    this.text = text;
  }

  // Method to generate text
  public generateText() {
    const options = {
      method: "POST",
      url: "https://api.cohere.ai/v1/generate",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${this.apiKey}`,
      },
      data: {
        max_tokens: 50,
        return_likelihoods: "NONE",
        truncate: "END",
        prompt: this.text,
      },
    };

    axios
      .request<CohereResponse>(options)
      .then((response: AxiosResponse<CohereResponse>) => {
        const generatedText = response.data.generations[0].text;
        console.log(generatedText);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  // Method to summarize text
  public summarize(
    model: string = "summarize-xlarge",
    length: string = "medium",
    extractiveness: string = "medium"
  ) {
    const options = {
      method: "POST",
      url: "https://api.cohere.ai/summarize",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      data: {
        text: this.text,
        model,
        length,
        extractiveness,
      },
    };

    axios
      .request(options)
      .then((response: AxiosResponse<any>) => {
        const summary = response.data.summary;
        console.log(summary);
      })
      .catch((error: any) => {
        console.error("Error summarizing the text:", error);
      });
  }
}
