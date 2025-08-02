#!/bin/bash
# Script to check all URLs in ResourceLocator.tsx for broken links

echo "Checking URLs from ResourceLocator.tsx..."

# Extract all unique URLs
grep -o 'website: "[^"]*"' client/src/pages/ResourceLocator.tsx | sed 's/website: "//g' | sed 's/"//g' | sort | uniq > all_urls.txt

# Function to check URL status
check_url() {
    local url="$1"
    local status=$(curl -I -s -o /dev/null -w "%{http_code}" --max-time 10 "$url" 2>/dev/null)
    
    if [[ -z "$status" ]]; then
        echo "TIMEOUT: $url"
    elif [[ "$status" -ge 400 ]]; then
        echo "BROKEN ($status): $url"
    elif [[ "$status" == "000" ]]; then
        echo "UNREACHABLE: $url"
    fi
}

# Check URLs in batches
broken_urls=()
while IFS= read -r url; do
    result=$(check_url "$url")
    if [[ -n "$result" ]]; then
        echo "$result"
        broken_urls+=("$url")
    fi
done < all_urls.txt

echo ""
echo "Summary of broken URLs found:"
printf '%s\n' "${broken_urls[@]}"

# Clean up
rm -f all_urls.txt