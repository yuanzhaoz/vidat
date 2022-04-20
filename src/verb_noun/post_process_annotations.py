import json

with open('src/verb_noun/annotations_test.json') as json_file:
    data = json.load(json_file)

for i in range(len(data['config']['actionLabelData'])):
    data['config']['actionLabelData'][i].pop('objects', None)

with open('src/verb_noun/annotations_test_processed.json','w') as json_file:
    json.dump(data, json_file, indent=4)