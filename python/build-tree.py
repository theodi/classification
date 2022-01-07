import pandas
from sklearn import tree
import pydotplus
from sklearn.tree import DecisionTreeClassifier
import matplotlib.pyplot as plt
import matplotlib.image as pltimg

df = pandas.read_csv("../data/csvs/Group_3.csv")

d = {'San Francisco': 0, 'New York': 1}
df['city'] = df['city'].map(d)

# Uneducated
#features = ['bath', 'beds', 'year_built', 'elevation', 'sqft', 'price', 'price_per_sqft']

# Educated
features = ['price_per_sqft', 'elevation', 'price' ]

X = df[features]
y = df['city']

dtree = DecisionTreeClassifier()
dtree = dtree.fit(X, y)
data = tree.export_graphviz(dtree, out_file=None, feature_names=features, max_depth=2)
graph = pydotplus.graph_from_dot_data(data)
graph.write_png('Group_3-educated.png')