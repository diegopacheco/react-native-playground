package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Page struct {
	Name string `json:"name"`
	Code string `json:"code"`
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
	headerCode := `
const HeaderComponent = () => {
  return React.createElement(View, {
    style: { backgroundColor: '#4A90E2', padding: 20, alignItems: 'center' }
  },
    React.createElement(Text, {
      style: { color: 'white', fontSize: 24, fontWeight: 'bold' }
    }, 'Dynamic App Header')
  );
};

return HeaderComponent;
`
	return Page{
		Name: "header",
		Code: headerCode,
	}
}

func getFooterPage() Page {
	footerCode := `
const FooterComponent = () => {
  return React.createElement(View, {
    style: { backgroundColor: '#333', padding: 15, alignItems: 'center' }
  },
    React.createElement(Text, {
      style: { color: 'white', fontSize: 12 }
    }, '© 2025 Dynamic App - Diego Pacheco')
  );
};

return FooterComponent;
`
	return Page{
		Name: "footer",
		Code: footerCode,
	}
}

func getCalculatorPage() Page {
	calculatorCode := `
const CalculatorComponent = () => {
  const [inputValues, setInputValues] = React.useState({});
  const [result, setResult] = React.useState('Result will appear here');
  const inputRefs = React.useRef({});

  const performCalculation = (operation, num1, num2) => {
    const n1 = parseFloat(num1 || '0');
    const n2 = parseFloat(num2 || '0');

    if (isNaN(n1) || isNaN(n2)) {
      return 'Error: Please enter valid numbers';
    }

    let calcResult;
    let symbol;

    switch (operation) {
      case 'add':
        calcResult = n1 + n2;
        symbol = '+';
        break;
      case 'subtract':
        calcResult = n1 - n2;
        symbol = '-';
        break;
      case 'multiply':
        calcResult = n1 * n2;
        symbol = '×';
        break;
      case 'divide':
        if (n2 === 0) {
          return 'Error: Cannot divide by zero';
        }
        calcResult = n1 / n2;
        symbol = '÷';
        break;
      case 'power':
        calcResult = Math.pow(n1, n2);
        symbol = '^';
        break;
      case 'sqrt':
        if (n1 < 0) {
          return 'Error: Cannot take square root of negative number';
        }
        calcResult = Math.sqrt(n1);
        return 'sqrt(' + n1 + ') = ' + calcResult.toFixed(4);
      default:
        return 'Error: Unknown operation';
    }

    return n1 + ' ' + symbol + ' ' + n2 + ' = ' + calcResult;
  };

  const handleCalculation = (operation) => {
    const resultText = performCalculation(operation, inputValues.num1, inputValues.num2);
    setResult(resultText);
  };

  const handleRandomNumber = () => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    setInputValues(prev => ({ ...prev, num1: randomNum.toString() }));
    Alert.alert('Random Number', 'Generated: ' + randomNum);
  };

  const handleClear = () => {
    setInputValues({});
    setResult('Result cleared');
    if (inputRefs.current.num1) {
      inputRefs.current.num1.clear();
    }
    if (inputRefs.current.num2) {
      inputRefs.current.num2.clear();
    }
  };

  const handleInputChange = (id, value) => {
    setInputValues(prev => ({ ...prev, [id]: value }));
  };

  return React.createElement(ScrollView, {
    style: { flex: 1, backgroundColor: '#f5f5f5' }
  },
    React.createElement(View, { style: { padding: 20 } },

      React.createElement(Text, {
        style: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 }
      }, 'Dynamic Calculator'),

      React.createElement(TextInput, {
        ref: (ref) => { inputRefs.current.num1 = ref; },
        style: {
          borderWidth: 1, borderColor: '#ccc', padding: 15, marginBottom: 10,
          backgroundColor: 'white', fontSize: 18, textAlign: 'center'
        },
        placeholder: 'Enter first number',
        keyboardType: 'numeric',
        value: inputValues.num1 || '',
        onChangeText: (value) => handleInputChange('num1', value)
      }),

      React.createElement(TextInput, {
        ref: (ref) => { inputRefs.current.num2 = ref; },
        style: {
          borderWidth: 1, borderColor: '#ccc', padding: 15, marginBottom: 20,
          backgroundColor: 'white', fontSize: 18, textAlign: 'center'
        },
        placeholder: 'Enter second number',
        keyboardType: 'numeric',
        value: inputValues.num2 || '',
        onChangeText: (value) => handleInputChange('num2', value)
      }),

      React.createElement(View, {
        style: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }
      },
        React.createElement(TouchableOpacity, {
          style: { backgroundColor: '#4A90E2', padding: 15, borderRadius: 5, minWidth: 60 },
          onPress: () => handleCalculation('add')
        },
          React.createElement(Text, {
            style: { color: 'white', textAlign: 'center', fontWeight: 'bold' }
          }, '+')
        ),
        React.createElement(TouchableOpacity, {
          style: { backgroundColor: '#E74C3C', padding: 15, borderRadius: 5, minWidth: 60 },
          onPress: () => handleCalculation('subtract')
        },
          React.createElement(Text, {
            style: { color: 'white', textAlign: 'center', fontWeight: 'bold' }
          }, '-')
        ),
        React.createElement(TouchableOpacity, {
          style: { backgroundColor: '#27AE60', padding: 15, borderRadius: 5, minWidth: 60 },
          onPress: () => handleCalculation('multiply')
        },
          React.createElement(Text, {
            style: { color: 'white', textAlign: 'center', fontWeight: 'bold' }
          }, '×')
        ),
        React.createElement(TouchableOpacity, {
          style: { backgroundColor: '#F39C12', padding: 15, borderRadius: 5, minWidth: 60 },
          onPress: () => handleCalculation('divide')
        },
          React.createElement(Text, {
            style: { color: 'white', textAlign: 'center', fontWeight: 'bold' }
          }, '÷')
        )
      ),

      React.createElement(View, {
        style: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }
      },
        React.createElement(TouchableOpacity, {
          style: { backgroundColor: '#9B59B6', padding: 15, borderRadius: 5, minWidth: 60 },
          onPress: () => handleCalculation('power')
        },
          React.createElement(Text, {
            style: { color: 'white', textAlign: 'center', fontWeight: 'bold' }
          }, '^')
        ),
        React.createElement(TouchableOpacity, {
          style: { backgroundColor: '#E67E22', padding: 15, borderRadius: 5, minWidth: 60 },
          onPress: () => handleCalculation('sqrt')
        },
          React.createElement(Text, {
            style: { color: 'white', textAlign: 'center', fontWeight: 'bold' }
          }, '√')
        ),
        React.createElement(TouchableOpacity, {
          style: { backgroundColor: '#1ABC9C', padding: 15, borderRadius: 5, minWidth: 60 },
          onPress: handleRandomNumber
        },
          React.createElement(Text, {
            style: { color: 'white', textAlign: 'center', fontWeight: 'bold' }
          }, 'RND')
        ),
        React.createElement(TouchableOpacity, {
          style: { backgroundColor: '#E74C3C', padding: 15, borderRadius: 5, minWidth: 60 },
          onPress: handleClear
        },
          React.createElement(Text, {
            style: { color: 'white', textAlign: 'center', fontWeight: 'bold' }
          }, 'CLR')
        )
      ),

      React.createElement(View, {
        style: {
          backgroundColor: 'white', padding: 20, borderRadius: 10, marginTop: 20
        }
      },
        React.createElement(Text, {
          style: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' }
        }, result)
      )
    )
  );
};

return CalculatorComponent;
`

	return Page{
		Name: "page_calculator",
		Code: calculatorCode,
	}
}

func getNotePagePage() Page {
	notesCode := `
const NotesComponent = () => {
  const [inputValues, setInputValues] = React.useState({});
  const [notes, setNotes] = React.useState([]);
  const inputRefs = React.useRef({});

  const handleInputChange = (id, value) => {
    setInputValues(prev => ({ ...prev, [id]: value }));
  };

  const handleSaveNote = () => {
    const title = inputValues.noteTitle?.trim();
    const content = inputValues.noteContent?.trim();

    if (!title || !content) {
      Alert.alert('Error', 'Please enter both title and content');
      return;
    }

    setNotes(prev => [...prev, { title, content }]);
    setInputValues({});

    if (inputRefs.current.noteTitle) {
      inputRefs.current.noteTitle.clear();
    }
    if (inputRefs.current.noteContent) {
      inputRefs.current.noteContent.clear();
    }

    Alert.alert('Success', 'Note saved successfully!');
  };

  return React.createElement(ScrollView, {
    style: { flex: 1, backgroundColor: '#f8f9fa' }
  },
    React.createElement(View, { style: { padding: 20 } },

      React.createElement(Text, {
        style: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#333' }
      }, 'My Notes'),

      React.createElement(TextInput, {
        ref: (ref) => { inputRefs.current.noteTitle = ref; },
        style: {
          borderWidth: 1, borderColor: '#ddd', padding: 15, marginBottom: 15,
          backgroundColor: 'white', fontSize: 16, borderRadius: 8
        },
        placeholder: 'Note title',
        value: inputValues.noteTitle || '',
        onChangeText: (value) => handleInputChange('noteTitle', value)
      }),

      React.createElement(TextInput, {
        ref: (ref) => { inputRefs.current.noteContent = ref; },
        style: {
          borderWidth: 1, borderColor: '#ddd', padding: 15, marginBottom: 20,
          backgroundColor: 'white', fontSize: 16, height: 120, borderRadius: 8,
          textAlignVertical: 'top'
        },
        placeholder: 'Write your note here...',
        multiline: true,
        value: inputValues.noteContent || '',
        onChangeText: (value) => handleInputChange('noteContent', value)
      }),

      React.createElement(TouchableOpacity, {
        style: {
          backgroundColor: '#007AFF', padding: 15, borderRadius: 8,
          alignItems: 'center', marginBottom: 30
        },
        onPress: handleSaveNote
      },
        React.createElement(Text, {
          style: { color: 'white', fontSize: 16, fontWeight: 'bold' }
        }, 'Save Note')
      ),

      React.createElement(View, {
        style: { backgroundColor: 'white', padding: 20, borderRadius: 10, marginBottom: 20 }
      },
        React.createElement(Text, {
          style: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 }
        }, 'Saved Notes'),

        notes.length === 0 ?
          React.createElement(Text, {
            style: { fontSize: 14, color: '#666', fontStyle: 'italic' }
          }, 'No notes saved yet. Create your first note above!') :
          React.createElement(View, {},
            ...notes.map((note, index) =>
              React.createElement(View, {
                key: index,
                style: {
                  backgroundColor: '#f9f9f9', padding: 15, marginBottom: 10,
                  borderRadius: 8, borderLeftWidth: 3, borderLeftColor: '#007AFF'
                }
              },
                React.createElement(Text, {
                  style: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#333' }
                }, note.title),
                React.createElement(Text, {
                  style: { fontSize: 14, color: '#666', lineHeight: 20 }
                }, note.content)
              )
            )
          )
      )
    )
  );
};

return NotesComponent;
`

	return Page{
		Name: "page_note_page",
		Code: notesCode,
	}
}

func getInfoPage() Page {
	infoCode := `
const InfoComponent = () => {
  return React.createElement(ScrollView, {
    style: { flex: 1, backgroundColor: '#f0f0f0' }
  },
    React.createElement(View, { style: { padding: 20 } },

      React.createElement(Text, {
        style: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#333' }
      }, 'App Information'),

      React.createElement(View, {
        style: {
          backgroundColor: 'white', padding: 20, borderRadius: 10, marginBottom: 20,
          shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1,
          shadowRadius: 4, elevation: 3
        }
      },
        React.createElement(Text, {
          style: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#4A90E2' }
        }, 'About This App'),
        React.createElement(Text, {
          style: { fontSize: 16, lineHeight: 24, color: '#555' }
        }, 'This is a dynamic server-driven UI application built with React Native and Go. The entire user interface AND React code is dynamically generated from the backend, allowing for real-time updates without app store deployments.')
      ),

      React.createElement(View, {
        style: {
          backgroundColor: 'white', padding: 20, borderRadius: 10, marginBottom: 20,
          shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1,
          shadowRadius: 4, elevation: 3
        }
      },
        React.createElement(Text, {
          style: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#27AE60' }
        }, 'Features'),
        React.createElement(Text, {
          style: { fontSize: 16, marginBottom: 8, color: '#555' }
        }, '• Complete React components from backend'),
        React.createElement(Text, {
          style: { fontSize: 16, marginBottom: 8, color: '#555' }
        }, '• Dynamic JavaScript code execution'),
        React.createElement(Text, {
          style: { fontSize: 16, marginBottom: 8, color: '#555' }
        }, '• Zero hardcoded UI in mobile app'),
        React.createElement(Text, {
          style: { fontSize: 16, marginBottom: 8, color: '#555' }
        }, '• Real-time code updates'),
        React.createElement(Text, {
          style: { fontSize: 16, color: '#555' }
        }, '• Safe code execution environment')
      ),

      React.createElement(View, {
        style: {
          backgroundColor: 'white', padding: 20, borderRadius: 10,
          shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1,
          shadowRadius: 4, elevation: 3
        }
      },
        React.createElement(Text, {
          style: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#E74C3C' }
        }, 'Technical Stack'),
        React.createElement(Text, {
          style: { fontSize: 16, marginBottom: 8, color: '#555' }
        }, 'Frontend: React Native + Dynamic Code Execution'),
        React.createElement(Text, {
          style: { fontSize: 16, marginBottom: 8, color: '#555' }
        }, 'Backend: Go + Gin Gonic + React Code Generation'),
        React.createElement(Text, {
          style: { fontSize: 16, color: '#555' }
        }, 'Architecture: True Server-Driven UI with Code')
      )
    )
  );
};

return InfoComponent;
`

	return Page{
		Name: "page_info",
		Code: infoCode,
	}
}