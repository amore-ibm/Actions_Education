const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

//port setup
const PORT = 8080;

//app setup
const app = express();
app.use(bodyParser.json());

// Data Science knowledge base
const data_science_kb = {
    "Data Engineering": {
        "Child": "Data engineering is like building a big toy castle, but instead of using toy blocks, you use a lot of numbers and letters to make sure the castle is strong and can be played with easily.",
        "High School Student": "Data engineering is like building a huge puzzle with many different pieces that need to fit together perfectly. The pieces in this case are a lot of data, and data engineers make sure that the pieces are organized and can be used to solve problems and answer questions.",
        "College Student": "Data engineering is the process of designing, building, and maintaining the infrastructure that allows data scientists and analysts to work with large amounts of data. This includes developing systems to store, process, and transform data so that it can be used for analysis and decision-making.",
        "Expert": "Data engineering involves the use of various techniques and tools to manage and optimize large-scale data processing systems. It encompasses the design and implementation of data pipelines, ETL (extract, transform, load) processes, data warehouses, and other systems to enable efficient and scalable data analysis. Data engineers also work closely with data scientists and analysts to ensure that the data they use is accurate, consistent, and properly stored."
        },
    "Machine Learning": {
        "Child": "Machine learning is like teaching your toy robot how to make decisions. You give it a lot of examples and it learns from them, so it can make good choices on its own.",
        "High School Student": "Machine learning is a way to teach computers how to learn from data, without being explicitly programmed. By using algorithms and statistical models, computers can identify patterns and make predictions based on data.",
        "College Student": "Machine learning is a subset of artificial intelligence that focuses on building algorithms and models that enable computers to automatically improve their performance on a specific task by learning from data. This involves selecting appropriate features, creating and training models, and evaluating their performance.",
        "Expert": "Machine learning involves the development of complex algorithms and models that can identify patterns and relationships in large datasets. It involves selecting and preparing data, selecting appropriate models and algorithms, tuning their parameters, and evaluating their performance. Experts in machine learning use a variety of techniques such as deep learning, reinforcement learning, and natural language processing to build advanced models that can be used in a wide range of applications." 
        },
    "Data Visualization": {
        "Child": "Data visualization is like drawing pictures with numbers. You can use different colors and shapes to show the important parts of the data, and make it easier to understand.",
        "High School Student": "Data visualization is a way to present data in a graphical or visual format, such as charts, graphs, and maps. By representing data visually, it can be easier to understand trends, patterns, and relationships in the data.",
        "College Student": "Data visualization involves the creation of effective and informative visual representations of data. This includes selecting appropriate visual encodings, designing visualizations to match the message, and understanding how to use visualizations to communicate insights and findings.",
        "Expert": "Data visualization is the process of creating visual representations of data to help people better understand, analyze, and communicate information. Experts in data visualization use a variety of techniques, such as information design, visual perception, and human-computer interaction, to create effective visualizations that are easy to interpret and communicate complex ideas." 
        }  
  };

// Handle requests to the API
app.post('/knowledge', function (req, res) {
    // Retrieve arguments from request body
    const topic = req.body.topic;
    const level = req.body.level;
    
    // Look up response in knowledge base
    const response = data_science_kb[topic][level];
  
    // Send response back
    res.send({ response: response });
  });

function getKnowledge() {
  // Get the selected topic and level
  const topic = document.getElementById("topic").value;
  const level = document.getElementById("level").value;

  // Send a POST request to the API with the topic and level
  fetch("/knowledge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic: topic,
      level: level,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Display the response in the HTML
      const responseElement = document.getElementById("response");
      responseElement.innerHTML = data.response;
    });
}


// Serve homepage
app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

app.listen(PORT, () => {
    console.log("Server running on port 8080");
});
