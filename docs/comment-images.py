#!/usr/bin/env python3
"""
Script to comment out image references in MDX files to prevent build errors
when screenshots are not yet available.
"""

import re
import glob
import os

# Pattern to match image markdown
IMAGE_PATTERN = re.compile(r'^(!\[.*?\]\(/img/user-guide/.*?\.png\))$', re.MULTILINE)

def comment_images(file_path):
    """Comment out image references in a file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace images with commented version
    new_content = IMAGE_PATTERN.sub(r'<!-- TODO: Add screenshot - \1 -->', content)
    
    # Only write if changes were made
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    # Get all MDX files in user-guide directory
    pattern = '/home/arthuryan/EPITECH/area/docs/docs/user-guide/*.mdx'
    files = glob.glob(pattern)
    
    print(f"Found {len(files)} MDX files")
    
    modified_count = 0
    for file_path in files:
        filename = os.path.basename(file_path)
        if comment_images(file_path):
            print(f"✓ Modified: {filename}")
            modified_count += 1
        else:
            print(f"- No changes: {filename}")
    
    print(f"\nTotal files modified: {modified_count}")

if __name__ == '__main__':
    main()
