## JSON Tree Explorer

This is a simple React application that allows users to explore JSON data by loading a JSON file, visualizing its structure in a collapsible tree, and automatically generating XPath expressions based on the selected nodes in the tree.
Features

  - Drag and drop JSON file or click to open file dialog to load JSON data
  - Visualize JSON structure in a collapsible tree view
  - Select nodes in the tree to generate XPath expressions
  - Copy generated XPath expressions to clipboard
  - Click on an XPath expression to focus and expand the corresponding node in the tree

##File Breakdown

###App.js

The main application component that brings together all the other components and manages the application's state.

###FileDropArea.js

A component that provides a drop area for users to drag and drop a JSON file or click to open a file dialog. It also validates the file content to ensure it is valid JSON data.

###JSONTree.js

A component that takes JSON data as input and renders it as a collapsible tree view. Each node can be selected, and its path is reported back to the main App component.
JSONNode is a sub-component of JSONTree that represents individual nodes within the tree view. It handles node selection, expansion, and rendering of the node itself.

###XPathGenerator.js

A component that takes the selected node paths from the JSONTree and displays them as XPath expressions. It provides a copy to clipboard feature and allows users to click on an XPath expression to navigate to the corresponding node in the JSONTree.

###App.css, JSONTree.css, XPathGenerator.css

CSS files for styling the respective components.
