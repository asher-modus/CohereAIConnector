//Make it eventually have two constructors and either pass in 3 or 5 arguments 3 would be generate 5 wouold be the summary witht the options
import axios, { AxiosResponse } from "axios";

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

export class Cohere {
  private apiKey: string;
  private text: string;
  private summary: boolean;

  constructor(apiKey: string, text: string, summary: boolean) {
    this.apiKey = apiKey;
    this.text = text;
    this.summary = summary;
  }

  get options() {
    return {
      method: "POST",
      url: "https://api.cohere.ai/v1/generate",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${this.apiKey}`,
      },
      data: {
        max_tokens: 20,
        return_likelihoods: "NONE",
        truncate: "END",
        prompt: this.text,
      },
    };
  }

  //Generate text
  private generateText() {
    axios
      .request<CohereResponse>(this.options)
      .then((response: AxiosResponse<CohereResponse>) => {
        const generatedText = response.data.generations[0].text;
        console.log(generatedText);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  // Model settings
  settings = {
    model: "summarize-xlarge",
    length: "medium",
    extractiveness: "medium",
  };
  //Summarize the text (Greater than 250 characters)
  private async summarize() {
    try {
      const response = await axios.post(
        //Make sure this is indeed the correct url chatgpt generated it
        "https://api.cohere.ai/summarize",
        {
          text: this.text,
          ...this.settings,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const summary = response.data.summary;
      console.log(summary);
    } catch (error) {
      console.error("Error summarizing the text:", error);
    }
  }
  public main() {
    if (this.summary) {
      this.summarize();
    } else {
      this.generateText();
    }
  }
}
