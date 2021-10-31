#! /usr/bin/env bash
echo  ${{steps.build_changelog.outputs.changelog}}
echo  ${{steps.build_changelog.outputs.fromTag}}
echo ${{steps.build_changelog.outputs.toTag}}


