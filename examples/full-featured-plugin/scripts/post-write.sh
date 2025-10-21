#!/bin/bash

# PostToolUse[Write|Edit] hook example
# This runs after Write or Edit tool is used

# Example: Could run a formatter, linter, or validation
# For this demo, we just acknowledge the write operation

echo "Post-write hook executed (this is just an example - real hooks would format/validate)"
