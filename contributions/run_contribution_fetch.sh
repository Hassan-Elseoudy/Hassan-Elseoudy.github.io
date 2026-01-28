#!/bin/bash

# Comprehensive Contribution Fetcher Runner Script
# Author: Hassan Elseoudy

set -e

# Configuration
JIRA_TOKEN=""
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PYTHON_SCRIPT="$SCRIPT_DIR/fetch_contributions.py"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Hassan Elseoudy - Contribution Fetcher${NC}"
echo -e "${BLUE}======================================${NC}"

# Check dependencies
echo -e "${YELLOW}🔍 Checking dependencies...${NC}"

# Check Python
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python3 is required but not installed${NC}"
    exit 1
fi

# Check GitHub CLI
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI (gh) is required but not installed${NC}"
    echo -e "${YELLOW}Install with: brew install gh${NC}"
    exit 1
fi

# Check GitHub authentication
if ! gh auth status &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI not authenticated${NC}"
    echo -e "${YELLOW}Run: gh auth login${NC}"
    exit 1
fi

# Install Python dependencies
echo -e "${YELLOW}📦 Installing Python dependencies...${NC}"
pip3 install requests > /dev/null 2>&1 || {
    echo -e "${RED}❌ Failed to install Python requests library${NC}"
    exit 1
}

echo -e "${GREEN}✅ All dependencies ready${NC}"

# Default values
START_DATE=""
END_DATE=""
OUTPUT_FILE="contributions_$(date +%Y%m%d_%H%M%S).csv"
RECENT_DAYS=90

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --start-date)
            START_DATE="$2"
            shift 2
            ;;
        --end-date)
            END_DATE="$2"
            shift 2
            ;;
        --output)
            OUTPUT_FILE="$2"
            shift 2
            ;;
        --recent-days)
            RECENT_DAYS="$2"
            shift 2
            ;;
        --help|-h)
            echo "Usage: $0 [options]"
            echo ""
            echo "Options:"
            echo "  --start-date YYYY-MM-DD    Start date for Jira search"
            echo "  --end-date YYYY-MM-DD      End date for Jira search"
            echo "  --output FILENAME          Output CSV filename"
            echo "  --recent-days NUMBER       Days for recent GitHub activity (default: 90)"
            echo "  --help, -h                 Show this help message"
            echo ""
            echo "Examples:"
            echo "  $0                                    # Fetch all contributions"
            echo "  $0 --start-date 2024-01-01          # Fetch from Jan 2024"
            echo "  $0 --start-date 2024-01-01 --end-date 2024-12-31  # Fetch 2024 only"
            echo "  $0 --output my_report.csv           # Custom output filename"
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Unknown option: $1${NC}"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Build Python command arguments
PYTHON_ARGS=(
    "--jira-token" "$JIRA_TOKEN"
    "--output" "$OUTPUT_FILE"
    "--recent-days" "$RECENT_DAYS"
)

if [[ -n "$START_DATE" ]]; then
    PYTHON_ARGS+=("--start-date" "$START_DATE")
fi

if [[ -n "$END_DATE" ]]; then
    PYTHON_ARGS+=("--end-date" "$END_DATE")
fi

# Display configuration
echo -e "${BLUE}📋 Configuration:${NC}"
echo -e "   Start Date: ${START_DATE:-All time}"
echo -e "   End Date: ${END_DATE:-Present}"
echo -e "   Output File: $OUTPUT_FILE"
echo -e "   Recent Days: $RECENT_DAYS"
echo ""

# Run the Python script
echo -e "${YELLOW}🚀 Starting contribution fetch...${NC}"
echo ""

if python3 "$PYTHON_SCRIPT" "${PYTHON_ARGS[@]}"; then
    echo ""
    echo -e "${GREEN}🎉 Success! Contribution data has been fetched.${NC}"
    echo -e "${GREEN}📄 Report saved to: $OUTPUT_FILE${NC}"
    
    # Show file size
    if [[ -f "$OUTPUT_FILE" ]]; then
        FILE_SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)
        echo -e "${BLUE}📊 Report size: $FILE_SIZE${NC}"
    fi
    
    # Quick preview
    echo -e "${YELLOW}🔍 Quick preview (first 10 lines):${NC}"
    head -10 "$OUTPUT_FILE" 2>/dev/null || echo -e "${RED}Could not preview file${NC}"
    
else
    echo -e "${RED}❌ Failed to fetch contributions${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}💡 Next steps:${NC}"
echo -e "   • Open $OUTPUT_FILE in Excel or Google Sheets"
echo -e "   • Review the contribution summary above"
echo -e "   • Use data for resume updates or performance reviews"
echo ""