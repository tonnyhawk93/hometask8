#! /usr/bin/env bash
echo  ${{steps.build_changelog.outputs.changelog}}
echo  ${{steps.build_changelog.outputs.fromTag}}
echo ${{steps.build_changelog.outputs.toTag}}

# curl \
#   -X POST \
#   -H "Accept: application/vnd.github.v3+json" \
#   https://api.github.com/repos/octocat/hello-world/git/blobs \
#   -d '{"content":"content"}'
#git update-index --chmod=+x ./.github/scripts/tracker.sh

