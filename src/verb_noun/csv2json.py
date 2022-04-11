import json, csv

noun_classes = []
noun_dict = []
with open('src/verb_noun/noun.csv', 'r') as file:
    reader = csv.reader(file)
    for row in reader:
        noun_classes.append(row[1])
noun_classes = noun_classes[1:]


verb_classes = []
verb_dict = []
with open('src/verb_noun/verb.csv', 'r') as file:
    reader = csv.reader(file)
    for row in reader:
        verb_classes.append(row[1])
verb_classes = verb_classes[1:]


for i, noun in enumerate(noun_classes):
    noun_dict.append({
      "id": i,
      "name": noun,
      "color": "#00FF00"
    })

for i, verb in enumerate(verb_classes):
    verb_dict.append({
      "id": i,
      "name": verb,
      "color": "#00FF00"
    })

noun_dict = sorted(noun_dict, key=lambda d: d['name']) 
with open('src/verb_noun/noun.json','w') as json_file:
    json.dump(noun_dict, json_file, indent=4)

verb_dict = sorted(verb_dict, key=lambda d: d['name']) 
with open('src/verb_noun/verb.json','w') as json_file:
    json.dump(verb_dict, json_file, indent=4)

