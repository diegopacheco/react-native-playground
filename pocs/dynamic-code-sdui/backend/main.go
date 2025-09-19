package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Component struct {
	Type     string                 `json:"type"`
	Props    map[string]interface{} `json:"props,omitempty"`
	Children []Component            `json:"children,omitempty"`
	Text     string                 `json:"text,omitempty"`
	Actions  map[string]string      `json:"actions,omitempty"`
	Code     string                 `json:"code,omitempty"`
}

type Page struct {
	Name       string      `json:"name"`
	Components []Component `json:"components"`
	Code       string      `json:"code,omitempty"`
}

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"*"},
		AllowCredentials: true,
	}))

	r.GET("/api/page/:name", getPage)

	r.Run(":8080")
}

func getPage(c *gin.Context) {
	pageName := c.Param("name")

	var page Page

	switch pageName {
	case "header":
		page = getHeaderPage()
	case "footer":
		page = getFooterPage()
	case "page_calculator":
		page = getCalculatorPage()
	case "page_note_page":
		page = getNotePagePage()
	case "page_info":
		page = getInfoPage()
	default:
		c.JSON(http.StatusNotFound, gin.H{"error": "Page not found"})
		return
	}

	c.JSON(http.StatusOK, page)
}

func getHeaderPage() Page {
	return Page{
		Name: "header",
		Components: []Component{
			{
				Type: "View",
				Props: map[string]interface{}{
					"style": map[string]interface{}{
						"backgroundColor": "#4A90E2",
						"padding":         20,
						"alignItems":      "center",
					},
				},
				Children: []Component{
					{
						Type: "Text",
						Props: map[string]interface{}{
							"style": map[string]interface{}{
								"color":      "white",
								"fontSize":   24,
								"fontWeight": "bold",
							},
						},
						Text: "Dynamic App Header",
					},
				},
			},
		},
	}
}

func getFooterPage() Page {
	return Page{
		Name: "footer",
		Components: []Component{
			{
				Type: "View",
				Props: map[string]interface{}{
					"style": map[string]interface{}{
						"backgroundColor": "#333",
						"padding":         15,
						"alignItems":      "center",
					},
				},
				Children: []Component{
					{
						Type: "Text",
						Props: map[string]interface{}{
							"style": map[string]interface{}{
								"color":    "white",
								"fontSize": 12,
							},
						},
						Text: "© 2025 Dynamic App - Diego Pacheco",
					},
				},
			},
		},
	}
}

func getCalculatorPage() Page {
	calculatorCode := `
// Dynamic Calculator Logic from Backend
const performCalculation = (operation, num1, num2) => {
  const n1 = parseFloat(num1 || '0');
  const n2 = parseFloat(num2 || '0');

  if (isNaN(n1) || isNaN(n2)) {
    return 'Error: Please enter valid numbers';
  }

  let result;
  let symbol;

  switch (operation) {
    case 'add':
      result = n1 + n2;
      symbol = '+';
      break;
    case 'subtract':
      result = n1 - n2;
      symbol = '-';
      break;
    case 'multiply':
      result = n1 * n2;
      symbol = '×';
      break;
    case 'divide':
      if (n2 === 0) {
        return 'Error: Cannot divide by zero';
      }
      result = n1 / n2;
      symbol = '÷';
      break;
    case 'power':
      result = Math.pow(n1, n2);
      symbol = '^';
      break;
    case 'sqrt':
      if (n1 < 0) {
        return 'Error: Cannot take square root of negative number';
      }
      result = Math.sqrt(n1);
      return 'sqrt(' + n1 + ') = ' + result.toFixed(4);
    default:
      return 'Error: Unknown operation';
  }

  return n1 + ' ' + symbol + ' ' + n2 + ' = ' + result;
};

const getRandomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};

const clearInputs = () => {
  return { num1: '', num2: '', result: 'Result cleared' };
};
`

	return Page{
		Name: "page_calculator",
		Code: calculatorCode,
		Components: []Component{
			{
				Type: "ScrollView",
				Props: map[string]interface{}{
					"style": map[string]interface{}{
						"flex":            1,
						"backgroundColor": "#f5f5f5",
					},
				},
				Children: []Component{
					{
						Type: "View",
						Props: map[string]interface{}{
							"style": map[string]interface{}{
								"padding": 20,
							},
						},
						Children: []Component{
							{
								Type: "Text",
								Props: map[string]interface{}{
									"style": map[string]interface{}{
										"fontSize":     28,
										"fontWeight":   "bold",
										"textAlign":    "center",
										"marginBottom": 30,
									},
								},
								Text: "Calculator",
							},
							{
								Type: "TextInput",
								Props: map[string]interface{}{
									"style": map[string]interface{}{
										"borderWidth":     1,
										"borderColor":     "#ccc",
										"padding":         15,
										"marginBottom":    10,
										"backgroundColor": "white",
										"fontSize":        18,
										"textAlign":       "center",
									},
									"placeholder":  "Enter first number",
									"keyboardType": "numeric",
									"id":           "num1",
								},
							},
							{
								Type: "TextInput",
								Props: map[string]interface{}{
									"style": map[string]interface{}{
										"borderWidth":     1,
										"borderColor":     "#ccc",
										"padding":         15,
										"marginBottom":    20,
										"backgroundColor": "white",
										"fontSize":        18,
										"textAlign":       "center",
									},
									"placeholder":  "Enter second number",
									"keyboardType": "numeric",
									"id":           "num2",
								},
							},
							{
								Type: "View",
								Props: map[string]interface{}{
									"style": map[string]interface{}{
										"flexDirection":  "row",
										"justifyContent": "space-around",
										"marginBottom":   20,
									},
								},
								Children: []Component{
									{
										Type: "TouchableOpacity",
										Props: map[string]interface{}{
											"style": map[string]interface{}{
												"backgroundColor": "#4A90E2",
												"padding":         15,
												"borderRadius":    5,
												"minWidth":        60,
											},
										},
										Actions: map[string]string{
											"onPress": "add",
										},
										Children: []Component{
											{
												Type: "Text",
												Props: map[string]interface{}{
													"style": map[string]interface{}{
														"color":      "white",
														"textAlign":  "center",
														"fontWeight": "bold",
													},
												},
												Text: "+",
											},
										},
									},
									{
										Type: "TouchableOpacity",
										Props: map[string]interface{}{
											"style": map[string]interface{}{
												"backgroundColor": "#E74C3C",
												"padding":         15,
												"borderRadius":    5,
												"minWidth":        60,
											},
										},
										Actions: map[string]string{
											"onPress": "subtract",
										},
										Children: []Component{
											{
												Type: "Text",
												Props: map[string]interface{}{
													"style": map[string]interface{}{
														"color":      "white",
														"textAlign":  "center",
														"fontWeight": "bold",
													},
												},
												Text: "-",
											},
										},
									},
									{
										Type: "TouchableOpacity",
										Props: map[string]interface{}{
											"style": map[string]interface{}{
												"backgroundColor": "#27AE60",
												"padding":         15,
												"borderRadius":    5,
												"minWidth":        60,
											},
										},
										Actions: map[string]string{
											"onPress": "multiply",
										},
										Children: []Component{
											{
												Type: "Text",
												Props: map[string]interface{}{
													"style": map[string]interface{}{
														"color":      "white",
														"textAlign":  "center",
														"fontWeight": "bold",
													},
												},
												Text: "×",
											},
										},
									},
									{
										Type: "TouchableOpacity",
										Props: map[string]interface{}{
											"style": map[string]interface{}{
												"backgroundColor": "#F39C12",
												"padding":         15,
												"borderRadius":    5,
												"minWidth":        60,
											},
										},
										Actions: map[string]string{
											"onPress": "divide",
										},
										Children: []Component{
											{
												Type: "Text",
												Props: map[string]interface{}{
													"style": map[string]interface{}{
														"color":      "white",
														"textAlign":  "center",
														"fontWeight": "bold",
													},
												},
												Text: "÷",
											},
										},
									},
								},
							},
							{
								Type: "View",
								Props: map[string]interface{}{
									"style": map[string]interface{}{
										"flexDirection":  "row",
										"justifyContent": "space-around",
										"marginBottom":   20,
									},
								},
								Children: []Component{
									{
										Type: "TouchableOpacity",
										Props: map[string]interface{}{
											"style": map[string]interface{}{
												"backgroundColor": "#9B59B6",
												"padding":         15,
												"borderRadius":    5,
												"minWidth":        60,
											},
										},
										Actions: map[string]string{
											"onPress": "power",
										},
										Children: []Component{
											{
												Type: "Text",
												Props: map[string]interface{}{
													"style": map[string]interface{}{
														"color":      "white",
														"textAlign":  "center",
														"fontWeight": "bold",
													},
												},
												Text: "^",
											},
										},
									},
									{
										Type: "TouchableOpacity",
										Props: map[string]interface{}{
											"style": map[string]interface{}{
												"backgroundColor": "#E67E22",
												"padding":         15,
												"borderRadius":    5,
												"minWidth":        60,
											},
										},
										Actions: map[string]string{
											"onPress": "sqrt",
										},
										Children: []Component{
											{
												Type: "Text",
												Props: map[string]interface{}{
													"style": map[string]interface{}{
														"color":      "white",
														"textAlign":  "center",
														"fontWeight": "bold",
													},
												},
												Text: "√",
											},
										},
									},
									{
										Type: "TouchableOpacity",
										Props: map[string]interface{}{
											"style": map[string]interface{}{
												"backgroundColor": "#1ABC9C",
												"padding":         15,
												"borderRadius":    5,
												"minWidth":        60,
											},
										},
										Actions: map[string]string{
											"onPress": "random",
										},
										Children: []Component{
											{
												Type: "Text",
												Props: map[string]interface{}{
													"style": map[string]interface{}{
														"color":      "white",
														"textAlign":  "center",
														"fontWeight": "bold",
													},
												},
												Text: "RND",
											},
										},
									},
									{
										Type: "TouchableOpacity",
										Props: map[string]interface{}{
											"style": map[string]interface{}{
												"backgroundColor": "#E74C3C",
												"padding":         15,
												"borderRadius":    5,
												"minWidth":        60,
											},
										},
										Actions: map[string]string{
											"onPress": "clear",
										},
										Children: []Component{
											{
												Type: "Text",
												Props: map[string]interface{}{
													"style": map[string]interface{}{
														"color":      "white",
														"textAlign":  "center",
														"fontWeight": "bold",
													},
												},
												Text: "CLR",
											},
										},
									},
								},
							},
							{
								Type: "View",
								Props: map[string]interface{}{
									"style": map[string]interface{}{
										"backgroundColor": "white",
										"padding":         20,
										"borderRadius":    10,
										"marginTop":       20,
									},
								},
								Children: []Component{
									{
										Type: "Text",
										Props: map[string]interface{}{
											"style": map[string]interface{}{
												"fontSize":   20,
												"fontWeight": "bold",
												"textAlign":  "center",
											},
											"id": "result",
										},
										Text: "Result will appear here",
									},
								},
							},
						},
					},
				},
			},
		},
	}
}

func getNotePagePage() Page {
	return Page{
		Name: "page_note_page",
		Components: []Component{
			{
				Type: "ScrollView",
				Props: map[string]interface{}{
					"style": map[string]interface{}{
						"flex":            1,
						"backgroundColor": "#f8f9fa",
					},
				},
				Children: []Component{
					{
						Type: "View",
						Props: map[string]interface{}{
							"style": map[string]interface{}{
								"padding": 20,
							},
						},
						Children: []Component{
							{
								Type: "Text",
								Props: map[string]interface{}{
									"style": map[string]interface{}{
										"fontSize":     28,
										"fontWeight":   "bold",
										"textAlign":    "center",
										"marginBottom": 30,
										"color":        "#333",
									},
								},
								Text: "My Notes",
							},
							{
								Type: "TextInput",
								Props: map[string]interface{}{
									"style": map[string]interface{}{
										"borderWidth":     1,
										"borderColor":     "#ddd",
										"padding":         15,
										"marginBottom":    15,
										"backgroundColor": "white",
										"fontSize":        16,
										"borderRadius":    8,
									},
									"placeholder": "Note title",
									"id":          "noteTitle",
								},
							},
							{
								Type: "TextInput",
								Props: map[string]interface{}{
									"style": map[string]interface{}{
										"borderWidth":       1,
										"borderColor":       "#ddd",
										"padding":           15,
										"marginBottom":      20,
										"backgroundColor":   "white",
										"fontSize":          16,
										"height":            120,
										"borderRadius":      8,
										"textAlignVertical": "top",
									},
									"placeholder": "Write your note here...",
									"multiline":   true,
									"id":          "noteContent",
								},
							},
							{
								Type: "TouchableOpacity",
								Props: map[string]interface{}{
									"style": map[string]interface{}{
										"backgroundColor": "#007AFF",
										"padding":         15,
										"borderRadius":    8,
										"alignItems":      "center",
										"marginBottom":    30,
									},
								},
								Actions: map[string]string{
									"onPress": "saveNote",
								},
								Children: []Component{
									{
										Type: "Text",
										Props: map[string]interface{}{
											"style": map[string]interface{}{
												"color":      "white",
												"fontSize":   16,
												"fontWeight": "bold",
											},
										},
										Text: "Save Note",
									},
								},
							},
							{
								Type: "View",
								Props: map[string]interface{}{
									"style": map[string]interface{}{
										"backgroundColor": "white",
										"padding":         20,
										"borderRadius":    10,
										"marginBottom":    20,
									},
									"id": "notesList",
								},
								Children: []Component{
									{
										Type: "Text",
										Props: map[string]interface{}{
											"style": map[string]interface{}{
												"fontSize":     18,
												"fontWeight":   "bold",
												"marginBottom": 15,
											},
										},
										Text: "Saved Notes",
									},
									{
										Type: "Text",
										Props: map[string]interface{}{
											"style": map[string]interface{}{
												"fontSize":  14,
												"color":     "#666",
												"fontStyle": "italic",
											},
										},
										Text: "No notes saved yet. Create your first note above!",
									},
								},
							},
						},
					},
				},
			},
		},
	}
}

func getInfoPage() Page {
	return Page{
		Name: "page_info",
		Components: []Component{
			{
				Type: "ScrollView",
				Props: map[string]interface{}{
					"style": map[string]interface{}{
						"flex":            1,
						"backgroundColor": "#f0f0f0",
					},
				},
				Children: []Component{
					{
						Type: "View",
						Props: map[string]interface{}{
							"style": map[string]interface{}{
								"padding": 20,
							},
						},
						Children: []Component{
							{
								Type: "Text",
								Props: map[string]interface{}{
									"style": map[string]interface{}{
										"fontSize":     28,
										"fontWeight":   "bold",
										"textAlign":    "center",
										"marginBottom": 30,
										"color":        "#333",
									},
								},
								Text: "App Information",
							},
							{
								Type: "View",
								Props: map[string]interface{}{
									"style": map[string]interface{}{
										"backgroundColor": "white",
										"padding":         20,
										"borderRadius":    10,
										"marginBottom":    20,
										"shadowColor":     "#000",
										"shadowOffset": map[string]interface{}{
											"width":  0,
											"height": 2,
										},
										"shadowOpacity": 0.1,
										"shadowRadius":  4,
										"elevation":     3,
									},
								},
								Children: []Component{
									{
										Type: "Text",
										Props: map[string]interface{}{
											"style": map[string]interface{}{
												"fontSize":     20,
												"fontWeight":   "bold",
												"marginBottom": 10,
												"color":        "#4A90E2",
											},
										},
										Text: "About This App",
									},
									{
										Type: "Text",
										Props: map[string]interface{}{
											"style": map[string]interface{}{
												"fontSize":   16,
												"lineHeight": 24,
												"color":      "#555",
											},
										},
										Text: "This is a dynamic server-driven UI application built with React Native and Go. The entire user interface is dynamically generated from the backend, allowing for real-time updates without app store deployments.",
									},
								},
							},
							{
								Type: "View",
								Props: map[string]interface{}{
									"style": map[string]interface{}{
										"backgroundColor": "white",
										"padding":         20,
										"borderRadius":    10,
										"marginBottom":    20,
										"shadowColor":     "#000",
										"shadowOffset": map[string]interface{}{
											"width":  0,
											"height": 2,
										},
										"shadowOpacity": 0.1,
										"shadowRadius":  4,
										"elevation":     3,
									},
								},
								Children: []Component{
									{
										Type: "Text",
										Props: map[string]interface{}{
											"style": map[string]interface{}{
												"fontSize":     20,
												"fontWeight":   "bold",
												"marginBottom": 10,
												"color":        "#27AE60",
											},
										},
										Text: "Features",
									},
									{
										Type: "Text",
										Props: map[string]interface{}{
											"style": map[string]interface{}{
												"fontSize":     16,
												"marginBottom": 8,
												"color":        "#555",
											},
										},
										Text: "• Dynamic UI components",
									},
									{
										Type: "Text",
										Props: map[string]interface{}{
											"style": map[string]interface{}{
												"fontSize":     16,
												"marginBottom": 8,
												"color":        "#555",
											},
										},
										Text: "• Server-driven layout",
									},
									{
										Type: "Text",
										Props: map[string]interface{}{
											"style": map[string]interface{}{
												"fontSize":     16,
												"marginBottom": 8,
												"color":        "#555",
											},
										},
										Text: "• Calculator functionality",
									},
									{
										Type: "Text",
										Props: map[string]interface{}{
											"style": map[string]interface{}{
												"fontSize":     16,
												"marginBottom": 8,
												"color":        "#555",
											},
										},
										Text: "• Note-taking capabilities",
									},
									{
										Type: "Text",
										Props: map[string]interface{}{
											"style": map[string]interface{}{
												"fontSize": 16,
												"color":    "#555",
											},
										},
										Text: "• Real-time updates",
									},
								},
							},
							{
								Type: "View",
								Props: map[string]interface{}{
									"style": map[string]interface{}{
										"backgroundColor": "white",
										"padding":         20,
										"borderRadius":    10,
										"shadowColor":     "#000",
										"shadowOffset": map[string]interface{}{
											"width":  0,
											"height": 2,
										},
										"shadowOpacity": 0.1,
										"shadowRadius":  4,
										"elevation":     3,
									},
								},
								Children: []Component{
									{
										Type: "Text",
										Props: map[string]interface{}{
											"style": map[string]interface{}{
												"fontSize":     20,
												"fontWeight":   "bold",
												"marginBottom": 10,
												"color":        "#E74C3C",
											},
										},
										Text: "Technical Stack",
									},
									{
										Type: "Text",
										Props: map[string]interface{}{
											"style": map[string]interface{}{
												"fontSize":     16,
												"marginBottom": 8,
												"color":        "#555",
											},
										},
										Text: "Frontend: React Native + Expo",
									},
									{
										Type: "Text",
										Props: map[string]interface{}{
											"style": map[string]interface{}{
												"fontSize":     16,
												"marginBottom": 8,
												"color":        "#555",
											},
										},
										Text: "Backend: Go + Gin Gonic",
									},
									{
										Type: "Text",
										Props: map[string]interface{}{
											"style": map[string]interface{}{
												"fontSize": 16,
												"color":    "#555",
											},
										},
										Text: "Architecture: Server-Driven UI",
									},
								},
							},
						},
					},
				},
			},
		},
	}
}
