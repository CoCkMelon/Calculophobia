ffmpeg -pattern_type glob -i "*.png" -filter_complex tile="$(/bin/ls -1q *png | wc -l)""x1" 1.png
