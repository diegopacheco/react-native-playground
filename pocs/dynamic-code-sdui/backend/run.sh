#!/bin/bash

echo "Starting Dynamic Server-Driven UI Backend..."
echo "API will be available at http://localhost:8080"
echo ""
echo "Available endpoints:"
echo "  GET /api/page/header"
echo "  GET /api/page/footer"
echo "  GET /api/page/page_calculator"
echo "  GET /api/page/page_note_page"
echo "  GET /api/page/page_info"
echo ""

go run main.go