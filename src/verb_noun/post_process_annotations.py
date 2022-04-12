import json

with open('annotations.json') as json_file:
    data = json.load(json_file)

# with open('bin/datatest.json','w') as json_file:
#     json.dump(data, json_file, indent=4)