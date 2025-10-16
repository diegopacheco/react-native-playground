#!/bin/bash
echo "React Native Lazy-Loaded Modules:"
echo "=================================="
echo ""
echo "Source Modules (Code-Split with React.lazy()):"
echo "----------------------------------------------"
echo ""
echo "Tab 1 - Calculator:"
if [ -f "src/remotes/calculator/Calculator.tsx" ]; then
    SIZE=$(wc -c < "src/remotes/calculator/Calculator.tsx" | awk '{printf "%.2f KB", $1/1024}')
    echo "  ✓ src/remotes/calculator/Calculator.tsx ($SIZE)"
else
    echo "  ✗ src/remotes/calculator/Calculator.tsx (not found)"
fi
echo ""
echo "Tab 2 - Notes:"
if [ -f "src/remotes/noteTaking/NoteTaking.tsx" ]; then
    SIZE=$(wc -c < "src/remotes/noteTaking/NoteTaking.tsx" | awk '{printf "%.2f KB", $1/1024}')
    echo "  ✓ src/remotes/noteTaking/NoteTaking.tsx ($SIZE)"
else
    echo "  ✗ src/remotes/noteTaking/NoteTaking.tsx (not found)"
fi
if [ -f "src/remotes/noteTaking/NoteTakingFooter.tsx" ]; then
    SIZE=$(wc -c < "src/remotes/noteTaking/NoteTakingFooter.tsx" | awk '{printf "%.2f KB", $1/1024}')
    echo "  ✓ src/remotes/noteTaking/NoteTakingFooter.tsx ($SIZE)"
else
    echo "  ✗ src/remotes/noteTaking/NoteTakingFooter.tsx (not found)"
fi
echo ""
echo "Tab 3 - Info Page:"
if [ -f "src/remotes/infoPage/HeaderInfoPage.tsx" ]; then
    SIZE=$(wc -c < "src/remotes/infoPage/HeaderInfoPage.tsx" | awk '{printf "%.2f KB", $1/1024}')
    echo "  ✓ src/remotes/infoPage/HeaderInfoPage.tsx ($SIZE)"
else
    echo "  ✗ src/remotes/infoPage/HeaderInfoPage.tsx (not found)"
fi
if [ -f "src/remotes/infoPage/ContentInfoPage.tsx" ]; then
    SIZE=$(wc -c < "src/remotes/infoPage/ContentInfoPage.tsx" | awk '{printf "%.2f KB", $1/1024}')
    echo "  ✓ src/remotes/infoPage/ContentInfoPage.tsx ($SIZE)"
else
    echo "  ✗ src/remotes/infoPage/ContentInfoPage.tsx (not found)"
fi
if [ -f "src/remotes/infoPage/FooterContentPage.tsx" ]; then
    SIZE=$(wc -c < "src/remotes/infoPage/FooterContentPage.tsx" | awk '{printf "%.2f KB", $1/1024}')
    echo "  ✓ src/remotes/infoPage/FooterContentPage.tsx ($SIZE)"
else
    echo "  ✗ src/remotes/infoPage/FooterContentPage.tsx (not found)"
fi
echo ""
echo "Bundled JavaScript Files:"
echo "------------------------"
if [ -d "ios/build" ]; then
    echo ""
    echo "iOS Build Artifacts:"
    find ios/build -name "*.jsbundle" -o -name "main.jsbundle" 2>/dev/null | while read -r file; do
        if [ -f "$file" ]; then
            SIZE=$(du -h "$file" | cut -f1)
            NAME=$(basename "$file")
            echo "  📦 $NAME - $SIZE"
            echo "     Path: $file"
        fi
    done
    BUNDLE_COUNT=$(find ios/build -name "*.jsbundle" -o -name "main.jsbundle" 2>/dev/null | wc -l | tr -d ' ')
    if [ "$BUNDLE_COUNT" -eq 0 ]; then
        echo "  ⚠ No bundle files found in ios/build"
        echo "     Run the app first to generate bundles"
    fi
else
    echo "  ⚠ ios/build directory not found"
    echo "     Run 'npm run ios' to generate iOS build artifacts"
fi
echo ""
if [ -d "node_modules/.cache/metro-bundler" ]; then
    echo "Metro Cache:"
    echo "-----------"
    CACHE_SIZE=$(du -sh node_modules/.cache/metro-bundler 2>/dev/null | cut -f1)
    echo "  Location: node_modules/.cache/metro-bundler"
    echo "  Size: $CACHE_SIZE"
    echo ""
fi
TOTAL_SOURCE_SIZE=$(find src/remotes -name "*.tsx" -o -name "*.ts" 2>/dev/null | xargs wc -c 2>/dev/null | tail -1 | awk '{printf "%.2f KB", $1/1024}')
echo "Summary:"
echo "--------"
echo "  Total source files size: $TOTAL_SOURCE_SIZE"
echo "  Lazy-loaded modules: 6"
echo "  Module Federation: Repack v5.2.1"
