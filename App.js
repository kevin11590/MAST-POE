import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Comprehensive Time & Course Aligned Suggestions Bank with Ingredients & Preparation Details
const TIME_SUGGESTIONS_BANK = {
  Breakfast: {
    Starters: [
      { name: 'Fresh Berry Parfait', desc: 'Greek yogurt layered with honey and mixed berries', ingredients: 'Greek yogurt, organic honey, fresh blueberries, strawberries, raspberries, granola crunch', prep: 'Layer Greek yogurt at the base of the glass, drizzle honey, add a generous handful of mixed berries, and repeat. Top with toasted oats.', price: '65.00' },
      { name: 'Avocado Toast', desc: 'Smashed avo on sourdough with micro-greens', ingredients: 'Ripe Hass avocado, artisanal sourdough bread, lemon juice, chili flakes, micro-greens, sea salt', prep: 'Toast the sourdough until crisp. Mash avocado with lemon juice, salt, and pepper. Spread thickly over toast and garnish with micro-greens and chili flakes.', price: '75.00' },
      { name: 'Smoked Salmon Crostini', desc: 'Cream cheese and capers on toasted baguette', ingredients: 'Sliced smoked salmon, cream cheese, fresh dill, capers, toasted baguette slices', prep: 'Spread cream cheese onto toasted baguette rounds. Top with folded smoked salmon slices, capers, and fresh sprigs of dill.', price: '95.00' },
      { name: 'Classic Fruit Bowl', desc: 'Seasonal tropical fruits with mint drizzle', ingredients: 'Pineapple, watermelon, papaya, kiwi, fresh mint leaves, lime juice', prep: 'Chop all seasonal fruits into bite-sized chunks. Toss gently with fresh lime juice and finely chiffonaded mint leaves.', price: '55.00' },
      { name: 'Chia Seed Pudding', desc: 'Almond milk, vanilla bean, and toasted coconut', ingredients: 'Chia seeds, unsweetened almond milk, maple syrup, vanilla bean paste, toasted coconut flakes', prep: 'Whisk chia seeds, almond milk, maple syrup, and vanilla together. Let sit overnight in the fridge to set. Garnish with toasted coconut.', price: '60.00' },
      { name: 'Grapefruit Brulée', desc: 'Caramelized brown sugar over fresh ruby grapefruit', ingredients: 'Ruby red grapefruit, brown sugar, a hint of cinnamon', prep: 'Cut grapefruit in half and section segments. Sprinkle an even layer of brown sugar on top. Torch with a culinary kitchen torch until bubbly and caramelized.', price: '50.00' },
      { name: 'Mini Green Smoothie Shot', desc: 'Spinach, apple, ginger, and lemon boost', ingredients: 'Baby spinach, green apple, fresh ginger root, lemon juice, coconut water', prep: 'Blend all ingredients in a high-speed blender until completely smooth. Strain if desired and serve chilled in shot glasses.', price: '40.00' },
      { name: 'Granola & Almond Milk', desc: 'House-roasted oats with organic honey', ingredients: 'Rolled oats, almonds, honey, coconut oil, almond milk, dried cranberries', prep: 'Roast oats, nuts, and honey at 160°C until golden. Serve in a bowl chilled with fresh almond milk.', price: '55.00' },
      { name: 'Ricotta & Fig Toast', desc: 'Fresh whipped ricotta with mission figs', ingredients: 'Whole milk ricotta, fresh mission figs, honey drizzle, toasted brioche', prep: 'Whip ricotta until fluffy. Spread over toasted brioche, top with quartered fresh figs, and drizzle with warm honey.', price: '80.00' },
      { name: 'Deviled Quail Eggs', desc: 'Paprika-dusted bite-sized breakfast starters', ingredients: 'Quail eggs, mayonnaise, Dijon mustard, smoked paprika, chives', prep: 'Boil quail eggs for 3 minutes, peel, and halve. Mix yolks with mayo and mustard, pipe back into whites, and dust with paprika.', price: '65.00' },
      { name: 'Cucumber Mint Gazpacho', desc: 'Refreshing cold morning vegetable broth shot', ingredients: 'English cucumber, green bell pepper, fresh mint, Greek yogurt, garlic, white wine vinegar', prep: 'Blend cucumber, pepper, mint, and garlic until liquified. Stir in yogurt and vinegar, chill thoroughly before serving.', price: '45.00' },
      { name: 'Warm Banana Bread Slice', desc: 'Served with cinnamon honey butter', ingredients: 'Ripe bananas, flour, butter, brown sugar, eggs, cinnamon, honey', prep: 'Bake banana loaf until golden brown. Slice thickly, toast lightly, and serve warm with whipped cinnamon honey butter.', price: '45.00' },
      { name: 'Acai Energy Bowl', desc: 'Blended acai topped with sliced banana and seeds', frozen: true, ingredients: 'Frozen acai packets, frozen banana, almond milk, chia seeds, sliced fruit', prep: 'Blend acai and frozen banana with a splash of almond milk into a thick sorbet consistency. Pour into a bowl and arrange toppings.', price: '85.00' },
      { name: 'Lemon Poppy Seed Muffin', desc: 'Freshly baked zesty morning pastry', ingredients: 'Flour, sugar, butter, lemon zest, fresh lemon juice, poppy seeds, buttermilk', prep: 'Fold lemon zest and poppy seeds into batter. Bake in muffin tins at 180°C for 20 minutes until golden and springy.', price: '40.00' },
      { name: 'Prosciutto Melon Bites', desc: 'Sweet cantaloupe wrapped in cured ham', ingredients: 'Ripe cantaloupe melon, sliced Italian prosciutto ham, balsamic reduction', prep: 'Cube cantaloupe into bite-sized pieces and wrap each piece securely with a thin strip of prosciutto. Drizzle lightly with glaze.', price: '85.00' },
      { name: 'Apple Cinnamon Oat Cup', desc: 'Baked oatmeal cup with warm spices', ingredients: 'Oats, diced apples, cinnamon, maple syrup, eggs, milk', prep: 'Mix ingredients together in a bowl, spoon into greased muffin cups, and bake at 175°C for 25 minutes until set.', price: '50.00' },
      { name: 'Zucchini Fritters', desc: 'Crisp mini patties with herb yogurt dip', ingredients: 'Grated zucchini, egg, flour, green onion, feta cheese, Greek yogurt', prep: 'Squeeze moisture out of grated zucchini, mix with egg, flour, and feta. Pan-fry in olive oil until golden and crisp.', price: '70.00' },
      { name: 'Cottage Cheese & Peaches', desc: 'Light protein bowl with sliced fruit', ingredients: 'Low-fat cottage cheese, fresh ripe peaches, sliced almonds', prep: 'Scoop creamy cottage cheese into a bowl, arrange fresh sliced peaches on top, and sprinkle with toasted almonds.', price: '55.00' },
      { name: 'Tomato Basil Bruschetta', desc: 'Garlic rubbed toast with morning harvest tomatoes', ingredients: 'Roma tomatoes, fresh basil, garlic cloves, olive oil, balsamic vinegar, rustic bread', prep: 'Dice tomatoes and mix with chopped basil, olive oil, and garlic. Spoon onto garlic-rubbed grilled bread slices.', price: '65.00' },
      { name: 'Herb Cream Cheese Dip', desc: 'Served with toasted bagel crisps', ingredients: 'Cream cheese, chives, parsley, dill, garlic powder, sliced bagels', prep: 'Whip cream cheese with finely minced fresh herbs and garlic powder. Serve alongside toasted bagel chips for dipping.', price: '60.00' }
    ],
    Mains: [
      { name: 'Eggs Benedict', desc: 'Poached eggs, ham, and hollandaise on an English muffin', ingredients: 'English muffins, smoked ham, poached eggs, egg yolks, butter, lemon juice', prep: 'Toast muffins, top with ham and poached eggs. Whisk egg yolks, lemon juice, and melted butter over double boiler to create hollandaise; pour over top.', price: '110.00' },
      { name: 'Full English Breakfast', desc: 'Eggs, bacon, sausage, baked beans, mushrooms, and toast', ingredients: 'Pork sausages, streaky bacon, eggs, canned baked beans, button mushrooms, white toast', prep: 'Fry bacon and sausages until crisp. Sauté mushrooms, fry eggs sunny-side up, heat baked beans, and serve with buttered toast.', price: '140.00' },
      { name: 'Fluffy Buttermilk Pancakes', desc: 'Stacked with maple syrup and whipped butter', ingredients: 'Flour, buttermilk, baking powder, eggs, butter, pure maple syrup', prep: 'Whisk dry ingredients with buttermilk and eggs. Ladle batter onto a hot buttered griddle, cook until bubbles form, flip until golden.', price: '85.00' },
      { name: 'Brioche French Toast', desc: 'Dusted with cinnamon sugar and fresh berries', ingredients: 'Thick brioche slices, eggs, heavy cream, cinnamon, vanilla extract, powdered sugar', prep: 'Whisk eggs, cream, and cinnamon. Dip brioche slices and pan-fry in butter until golden brown on both sides. Dust with powdered sugar.', price: '95.00' },
      { name: 'Omelette Deluxe', desc: 'Three-egg omelette with cheese, peppers, and mushrooms', ingredients: 'Eggs, cheddar cheese, bell peppers, button mushrooms, butter, salt and pepper', prep: 'Whisk eggs thoroughly. Pour into a hot buttered pan, add sautéed peppers and mushrooms, fold over with cheese until melted.', price: '90.00' },
      { name: 'Steak and Eggs', desc: 'Grilled sirloin with sunny-side up eggs and hash browns', ingredients: 'Beef sirloin steak, eggs, shredded potatoes, butter, garlic herb seasoning', prep: 'Pan-sear sirloin to medium-rare. Fry shredded potatoes into crispy hash brown patties, and fry eggs sunny-side up to serve alongside.', price: '165.00' },
      { name: 'Shakshuka', desc: 'Poached eggs in a spicy rich tomato and pepper sauce', ingredients: 'Canned tomatoes, bell peppers, onions, garlic, cumin, paprika, eggs, cilantro', prep: 'Sauté onions and peppers, add tomatoes and spices, simmer until thick. Make wells in sauce, crack eggs in, cover and poach until whites are set.', price: '100.00' },
      { name: 'Breakfast Burrito', desc: 'Scrambled eggs, chorizo, cheese, and salsa in a tortilla', ingredients: 'Flour tortilla, scrambled eggs, pork chorizo sausage, cheddar cheese, tomato salsa', prep: 'Cook chorizo, scramble eggs, and mix together. Place filling inside tortilla with cheese and salsa, roll tightly, and toast on a skillet.', price: '95.00' },
      { name: 'Belgian Waffle', desc: 'Crispy waffle with chocolate drizzle and cream', ingredients: 'Waffle batter, pearl sugar, melted chocolate sauce, whipped cream', prep: 'Pour batter into a preheated waffle iron, bake until golden and crisp. Drizzle with warm chocolate sauce and dollop whipped cream.', price: '85.00' },
      { name: 'Smoked Salmon Bagel', desc: 'Cream cheese, capers, red onion, and salmon', ingredients: 'Plain or everything bagel, cream cheese, smoked salmon, red onion rings, capers', prep: 'Toast bagel halves, spread thick layer of cream cheese, layer smoked salmon, top with thin red onion rings and capers.', price: '120.00' },
      { name: 'Corned Beef Hash', desc: 'Crispy potatoes and meat topped with a fried egg', ingredients: 'Canned corned beef, diced boiled potatoes, onions, butter, fried egg', prep: 'Sauté diced potatoes and onions until crisp, fold in flaked corned beef, press flat to form crust, and top with a fried egg.', price: '115.00' },
      { name: 'Huevos Rancheros', desc: 'Fried eggs on corn tortillas with black bean salsa', ingredients: 'Corn tortillas, fried eggs, black beans, salsa, avocado slices, cilantro', prep: 'Lightly fry corn tortillas, top with warm seasoned black beans, fried eggs, fresh salsa, and avocado slices.', price: '105.00' },
      { name: 'Avocado & Poached Egg Bowl', desc: 'Quinoa base with greens, seeds, and eggs', ingredients: 'Cooked quinoa, baby spinach, sliced avocado, poached eggs, pumpkin seeds', prep: 'Layer warm quinoa and spinach in a bowl. Top with sliced avocado, pumpkin seeds, and two soft-poached eggs.', price: '95.00' },
      { name: 'Lemon Ricotta Pancakes', desc: 'Light citrus-infused pancakes with berry compote', ingredients: 'Ricotta cheese, flour, eggs, lemon zest, lemon juice, mixed berry compote', prep: 'Fold ricotta and lemon zest into batter for extreme fluffiness. Cook on griddle and top with warm berry compote.', price: '105.00' },
      { name: 'Breakfast Quesadilla', desc: 'Folded tortilla with scrambled eggs and melted cheddar', ingredients: 'Large tortilla, scrambled eggs, shredded cheddar, diced ham, butter', prep: 'Place tortilla on skillet, add eggs, ham, and cheese on one half, fold over, and toast until golden and cheese melts.', price: '90.00' },
      { name: 'Mushroom & Spinach Frittata', desc: 'Baked Italian open-face egg pie', ingredients: 'Eggs, mushrooms, spinach, garlic, parmesan cheese, cream', prep: 'Sauté mushrooms and spinach in an oven-safe skillet. Pour beaten eggs and cream over top, bake at 180°C until set and golden.', price: '95.00' },
      { name: 'Sausage & Egg Biscuit', desc: 'Southern-style buttermilk biscuit sandwich', ingredients: 'Buttermilk biscuits, pork sausage patties, fried egg, American cheese', prep: 'Bake biscuits until golden. Pan-fry sausage patties, fry eggs, and assemble sandwich with cheese slice inside warm biscuit.', price: '80.00' },
      { name: 'Loaded Breakfast Bowl', desc: 'Potato hash, bacon, cheddar, and fried eggs', ingredients: 'Crispy potato tots, crumbled bacon, melted cheddar cheese, fried eggs, green onions', prep: 'Layer crispy potato tots in a bowl, top with bacon and melted cheddar, crown with fried eggs and chopped green onions.', price: '125.00' },
      { name: 'Baked Eggs in Purgatory', desc: 'Spicy puttanesca sauce with baked eggs and crusty bread', ingredients: 'San Marzano tomatoes, garlic, chili flakes, capers, olives, eggs, crusty bread', prep: 'Simmer tomatoes with garlic, chili, capers, and olives. Crack eggs directly into sauce and bake until whites are set. Serve with bread.', price: '110.00' },
      { name: 'Vegan Tofu Scramble', desc: 'Turmeric spiced tofu with spinach and peppers', ingredients: 'Firm tofu, turmeric powder, nutritional yeast, bell peppers, spinach, onion', prep: 'Crumble tofu into a pan with sautéed peppers and onions. Season with turmeric, nutritional yeast, and salt; cook until warm.', price: '90.00' }
    ],
    Dessert: [
      { name: 'Mini Cinnamon Roll', desc: 'Warm pastry with cream cheese icing', ingredients: 'Yeast dough, butter, cinnamon, brown sugar, cream cheese icing', prep: 'Roll dough with cinnamon sugar, slice into mini rounds, bake, and drizzle warm with cream cheese frosting.', price: '45.00' },
      { name: 'Blueberry Scone', desc: 'Buttery scone with clotted cream and jam', ingredients: 'Flour, butter, heavy cream, fresh blueberries, sugar, clotted cream', prep: 'Cut cold butter into flour and cream, fold in blueberries, shape into triangles, and bake until golden. Serve with cream and jam.', price: '50.00' },
      { name: 'Chocolate Croissant', desc: 'Flaky French pastry filled with dark chocolate', ingredients: 'Laminated puff pastry dough, dark chocolate batons, egg wash', prep: 'Wrap pastry dough around chocolate batons, proof, brush with egg wash, and bake at 200°C until flaky and golden.', price: '55.00' },
      { name: 'Apple Turnover', desc: 'Flaky puff pastry filled with spiced apples', ingredients: 'Puff pastry sheets, diced apples, cinnamon, sugar, butter', prep: 'Sauté apples with butter, sugar, and cinnamon. Spoon into puff pastry squares, seal edges, and bake until puffed and crisp.', price: '50.00' },
      { name: 'Almond Danish', desc: 'Sweet pastry layered with almond paste', ingredients: 'Danish pastry dough, almond frangipane paste, sliced almonds, powdered sugar', prep: 'Pipe almond frangipane into the center of pastry dough, top with sliced almonds, bake, and dust with powdered sugar.', price: '55.00' },
      { name: 'Banana Muffin', desc: 'Moist muffin with walnut crunch top', ingredients: 'Overripe bananas, flour, sugar, oil, eggs, chopped walnuts', prep: 'Mash bananas and mix with wet and dry ingredients. Sprinkle crushed walnuts on top before baking at 180°C for 22 minutes.', price: '40.00' },
      { name: 'Raspberry Tartlet', desc: 'Sweet pastry shell with custard and berries', ingredients: 'Shortcrust pastry shell, vanilla pastry cream, fresh raspberries, apricot glaze', prep: 'Fill baked pastry shell with chilled vanilla custard, arrange fresh raspberries neatly on top, and brush with warm apricot glaze.', price: '60.00' },
      { name: 'Honey Glazed Doughnut', desc: 'Freshly fried artisan glazed ring', ingredients: 'Yeast dough rings, frying oil, powdered sugar honey glaze', prep: 'Deep-fry dough rings until golden brown on both sides, dip immediately into warm honey glaze while still hot.', price: '35.00' },
      { name: 'Lemon Curd Tart', desc: 'Zesty lemon filling in a shortcrust pastry', ingredients: 'Shortcrust pastry, lemon juice, eggs, sugar, butter', prep: 'Whisk lemon juice, eggs, sugar, and butter over heat until thickened into curd. Pour into baked tart shell and chill.', price: '55.00' },
      { name: 'Maple Pecan Sticky Bun', desc: 'Gooey caramel pecan morning bun', ingredients: 'Sweet dough, maple syrup, brown sugar, butter, toasted pecans', prep: 'Pour maple caramel and pecans into pan bottoms, place rolled dough on top, bake, and invert onto a plate when done.', price: '65.00' },
      { name: 'Strawberry Crêpe', desc: 'Thin French pancake with sweet cream and berries', ingredients: 'Crêpe batter, whipped sweet cream, sliced fresh strawberries', prep: 'Swirl thin crêpe batter onto a hot buttered pan. Cook briefly, fill with whipped cream and strawberries, and roll up.', price: '75.00' },
      { name: 'Peach Yogurt Parfait Cup', desc: 'Layered Greek yogurt with poached peaches', ingredients: 'Greek yogurt, diced poached peaches, honey, oat crumble', prep: 'Layer yogurt and tender poached peaches in a cup, alternating layers and finishing with a crunchy oat crumble.', price: '55.00' },
      { name: 'Puff Pastry Twist', desc: 'Cinnamon sugar butter twists', ingredients: 'Puff pastry strips, melted butter, cinnamon sugar', prep: 'Brush pastry strips with butter, twist into spirals, coat in cinnamon sugar, and bake until crisp and caramelized.', price: '40.00' },
      { name: 'Chocolate Chip Breakfast Cookie', desc: 'Oats, honey, and dark chocolate chunks', ingredients: 'Rolled oats, peanut butter, honey, dark chocolate chunks', prep: 'Mix ingredients together, form into cookie discs, and refrigerate or bake lightly until set.', price: '45.00' },
      { name: 'Pear & Ginger Cake', desc: 'Spiced morning loaf slice', ingredients: 'Flour, diced pears, crystallized ginger, brown sugar, butter, spices', prep: 'Fold diced pears and chopped ginger into spiced cake batter. Bake in loaf pan until a toothpick inserted comes out clean.', price: '50.00' },
      { name: 'Vanilla Bean Scone', desc: 'Classic sweet tea scone', ingredients: 'Flour, butter, heavy cream, sugar, vanilla bean paste', prep: 'Cut vanilla bean paste into dry ingredients and cream, cut into wedges, and bake until tender and flaky.', price: '45.00' },
      { name: 'Nutella Stuffed Croissant', desc: 'Flaky pastry filled with rich hazelnut spread', ingredients: 'Croissant dough, Nutella hazelnut spread, powdered sugar', prep: 'Pipe a generous core of Nutella into the center of the croissant before baking, or slice baked croissant and fill.', price: '65.00' },
      { name: 'Rice Pudding Brulee', desc: 'Creamy sweet rice with torched sugar crust', ingredients: 'Arborio rice, milk, vanilla, sugar crust torching', prep: 'Simmer rice in milk and vanilla until creamy. Chill, sprinkle sugar on top, and torch until a hard caramel crust forms.', price: '60.00' },
      { name: 'Coconut Chia Custard', desc: 'Chilled tropical breakfast dessert cup', ingredients: 'Chia seeds, coconut milk, mango puree, shredded coconut', prep: 'Soak chia seeds in rich coconut milk until thick. Layer with sweet mango puree and top with toasted coconut flakes.', price: '55.00' },
      { name: 'Cherry Danish', desc: 'Golden pastry filled with sweet dark cherries', ingredients: 'Danish pastry, dark cherry pie filling, icing drizzle', prep: 'Pipe pastry edges, fill center depression with dark cherry filling, bake until golden, and finish with icing.', price: '55.00' }
    ]
  },
  Lunch: {
    Starters: [
      { name: 'Crispy Calamari', desc: 'Lightly dusted squid with garlic aioli', ingredients: 'Fresh squid rings, flour, cornstarch, garlic aioli, lemon wedges', prep: 'Dust squid rings in seasoned flour and cornstarch. Deep fry until golden and crispy for 2 minutes; serve with aioli.', price: '95.00' },
      { name: 'Caesar Salad', desc: 'Romaine lettuce, parmesan, croutons, and creamy dressing', ingredients: 'Romaine lettuce, garlic croutons, parmesan cheese shavings, Caesar dressing', prep: 'Toss crisp chopped romaine lettuce with creamy Caesar dressing, top with crunchy croutons and shaved parmesan cheese.', price: '85.00' },
      { name: 'Tomato Basil Soup', desc: 'Creamy roasted tomato soup with basil oil', ingredients: 'Ripe tomatoes, garlic, onion, vegetable broth, heavy cream, fresh basil', prep: 'Roast tomatoes and garlic, blend with broth and cream, simmer until warm, and garnish with homemade basil oil.', price: '70.00' },
      { name: 'Greek Salad', desc: 'Feta, olives, cucumber, tomatoes, and red onion', ingredients: 'Cucumbers, tomatoes, kalamata olives, feta cheese block, red onion, oregano', prep: 'Chop vegetables coarsely, toss with olive oil and red wine vinegar, top with a block of feta cheese and kalamata olives.', price: '80.00' },
      { name: 'Garlic Bread with Cheese', desc: 'Toasted baguette loaded with mozzarella and garlic butter', ingredients: 'French baguette, garlic herb butter, shredded mozzarella cheese', prep: 'Slice baguette lengthwise, spread generously with garlic butter, cover with mozzarella, and bake until melted and bubbling.', price: '60.00' },
      { name: 'Chicken Satay Skewers', desc: 'Grilled chicken skewers with spicy peanut sauce', ingredients: 'Chicken breast strips, peanut butter, coconut milk, soy sauce, lime juice, chili', prep: 'Thread chicken onto skewers, grill until charred and cooked. Blend peanut butter, coconut milk, and soy for dipping sauce.', price: '90.00' },
      { name: 'Butternut Squash Soup', desc: 'Velvety soup with toasted pumpkin seeds', ingredients: 'Butternut squash, onion, vegetable stock, cream, nutmeg, pumpkin seeds', prep: 'Roast squash and onions, blend with hot stock and cream until silky smooth. Garnish with roasted pumpkin seeds.', price: '75.00' },
      { name: 'Caprese Salad', desc: 'Fresh mozzarella, sliced tomatoes, and balsamic glaze', ingredients: 'Fior di latte mozzarella, vine tomatoes, fresh basil leaves, balsamic glaze', prep: 'Alternate slices of fresh mozzarella and ripe tomatoes on a plate, interleave basil leaves, and drizzle with balsamic glaze.', price: '95.00' },
      { name: 'Prawn Cocktail', desc: 'Prawns served on crisp lettuce with marie rose sauce', ingredients: 'Cooked prawns, shredded iceberg lettuce, marie rose sauce, lemon', prep: 'Layer shredded lettuce in a glass, top with chilled prawns, and spoon rich marie rose seafood sauce over top.', price: '110.00' },
      { name: 'Stuffed Mushrooms', desc: 'Mushroom caps filled with herb cream cheese and breadcrumbs', ingredients: 'Large mushroom caps, cream cheese, garlic, herbs, panko breadcrumbs', prep: 'Remove mushroom stems, fill caps with seasoned cream cheese mixture, top with panko, and bake at 190°C until tender.', price: '85.00' },
      { name: 'Minestrone Soup', desc: 'Traditional Italian vegetable and pasta soup', ingredients: 'Diced vegetables, kidney beans, pasta, tomato broth, parmesan rind', prep: 'Simmer vegetables, beans, and pasta in a rich tomato and herb broth until tender. Serve with grated parmesan.', price: '70.00' },
      { name: 'Beetroot & Goat Cheese Salad', desc: 'Roasted beets with creamy goat cheese and walnuts', ingredients: 'Baby beetroots, goat cheese medallions, walnuts, arugula, balsamic dressing', prep: 'Roast beets until tender, slice and lay over arugula. Crumble goat cheese on top, add walnuts, and dress with balsamic.', price: '90.00' },
      { name: 'Crispy Spring Rolls', desc: 'Vegetable rolls served with sweet chili dipping sauce', ingredients: 'Spring roll wrappers, cabbage, carrots, glass noodles, sweet chili sauce', prep: 'Wrap julienned veggies and noodles tightly in pastry sheets, deep fry until crisp and golden brown.', price: '75.00' },
      { name: 'Chicken Liver Paté', desc: 'Smooth paté served with toasted brioche and onion jam', ingredients: 'Chicken livers, butter, cream, shallots, brandy, onion jam, brioche', prep: 'Sauté livers and shallots, blend with butter, cream, and brandy until silky. Chill and serve with brioche and jam.', price: '95.00' },
      { name: 'Waldorf Salad', desc: 'Apples, celery, grapes, and walnuts in mayonnaise', ingredients: 'Crisp apples, celery stalks, red grapes, walnuts, mayonnaise dressing', prep: 'Dice apples and celery, halve grapes, toss with chopped walnuts and mayonnaise, and serve on lettuce leaves.', price: '85.00' },
      { name: 'Spicy Buffalo Wings', desc: 'Crispy chicken wings tossed in tangy hot sauce', ingredients: 'Chicken wings, hot pepper sauce, butter, garlic powder, celery sticks', prep: 'Deep fry wings until extra crispy. Toss immediately in a hot sauce and melted butter emulsion; serve with ranch.', price: '95.00' },
      { name: 'Potato Skins', desc: 'Loaded with bacon, cheddar, and spring onions', ingredients: 'Baked potato skins, bacon bits, cheddar cheese, sour cream, green onions', prep: 'Scoop out baked potato halves leaving a shell, load with bacon and cheddar, broil until melted, and top with sour cream.', price: '80.00' },
      { name: 'Falafel Bites', desc: 'Crispy chickpea fritters with tahini drizzle', ingredients: 'Chickpeas, fresh herbs, cumin, garlic, tahini paste, lemon juice', prep: 'Blend soaked chickpeas with herbs and spices, form into balls, deep fry until crunchy, and drizzle with tahini.', price: '75.00' },
      { name: 'Corn Chowder', desc: 'Rich and creamy sweetcorn soup with bacon bits', ingredients: 'Sweetcorn kernels, potatoes, onion, cream, chicken stock, bacon', prep: 'Sauté bacon and onions, add corn, potatoes, and stock; simmer until potatoes soften, stir in cream to thicken.', price: '75.00' },
      { name: 'Antipasto Platter', desc: 'Selection of cured meats, cheeses, and olives', ingredients: 'Prosciutto, salami, provolone cheese, marinated artichokes, mixed olives', prep: 'Arrange cured meats, artisan cheeses, olives, and antipasto vegetables artfully on a large wooden board.', price: '130.00' }
    ],
    Mains: [
      { name: 'Gourmet Beef Burger', desc: 'Juicy beef patty, cheddar, lettuce, tomato, and chips', ingredients: 'Beef patty, brioche bun, cheddar slice, tomato, lettuce, chips', prep: 'Grill beef patty tofection, melt cheese on top. Assemble in toasted brioche bun with lettuce and tomato; serve with hot chips.', price: '135.00' },
      { name: 'Grilled Chicken Wrap', desc: 'Sliced chicken, avocado, lettuce, and honey mustard wrap', ingredients: 'Tortilla, grilled chicken strips, avocado, lettuce, honey mustard sauce', prep: 'Lay tortilla flat, add sliced grilled chicken, fresh avocado slices, crisp lettuce, and drizzle with honey mustard before wrapping.', price: '110.00' },
      { name: 'Fish and Chips', desc: 'Beer-battered hake fillet with tartar sauce and chips', ingredients: 'Hake fillet, beer batter flour mix, thick cut chips, homemade tartar sauce', prep: 'Coat fish fillet in cold beer batter, deep fry until golden and crispy. Serve with thick chips and tangy tartar sauce.', price: '145.00' },
      { name: 'Club Sandwich', desc: 'Triple-decker chicken, bacon, lettuce, and tomato', ingredients: 'Toasted bread, grilled chicken breast, bacon strips, lettuce, tomato, mayo', prep: 'Layer ingredients between three slices of toasted bread, secure with toothpicks, and cut into four triangles.', price: '120.00' },
      { name: 'Creamy Alfredo Pasta', desc: 'Fettuccine pasta in a rich garlic parmesan cream sauce', ingredients: 'Fettuccine pasta, heavy cream, garlic, parmesan cheese, butter, parsley', prep: 'Boil pasta. Sauté garlic in butter, add heavy cream and freshly grated parmesan, toss pasta in sauce until coated.', price: '130.00' },
      { name: 'Steak Sandwich', desc: 'Sliced rump steak with caramelized onions on ciabatta', ingredients: 'Rump steak, ciabatta roll, caramelized onions, arugula, Dijon mayo', prep: 'Pan-sear steak to medium, slice thin. Toast ciabatta, spread Dijon mayo, pile high with steak and sweet caramelized onions.', price: '155.00' },
      { name: 'Margherita Pizza', desc: 'Classic wood-fired pizza with tomato, mozzarella, and basil', ingredients: 'Pizza dough, san marzano tomato sauce, fresh mozzarella, basil leaves', prep: 'Stretch dough, spread tomato sauce, top with torn mozzarella, bake in hot wood-fired oven, and garnish with fresh basil.', price: '115.00' },
      { name: 'Thai Green Curry', desc: 'Fragrant coconut curry with chicken and jasmine rice', ingredients: 'Chicken strips, green curry paste, coconut milk, bamboo shoots, jasmine rice', prep: 'Simmer curry paste in coconut milk, add chicken and vegetables, cook through, and serve hot over steamed jasmine rice.', price: '140.00' },
      { name: 'Quiche Lorraine', desc: 'Bacon and cheese baked savoury tart with side salad', ingredients: 'Shortcrust pastry, smoked bacon lardons, gruyere cheese, eggs, cream', prep: 'Blind bake pastry crust, fill with cooked bacon and grated cheese, pour egg-cream mixture over, and bake until set.', price: '105.00' },
      { name: 'Poke Bowl', desc: 'Fresh tuna, avocado, edamame, and rice with soy sesame', ingredients: 'Sushi rice, raw ahi tuna cubes, avocado, edamame beans, soy sesame dressing', prep: 'Place warm sushi rice in a bowl, arrange cubed tuna, avocado, and edamame neatly on top; drizzle with soy dressing.', price: '160.00' },
      { name: 'BBQ Pulled Pork Roll', desc: 'Slow-cooked tender pork with coleslaw on a brioche bun', ingredients: 'Pork shoulder, BBQ sauce, brioche bun, cabbage coleslaw', prep: 'Slow-roast pork until shreddable, toss in smoky BBQ sauce, pile high onto brioche bun and top with crunchy coleslaw.', price: '130.00' },
      { name: 'Nicoise Salad', desc: 'Tuna, green beans, boiled egg, potatoes, and olives', ingredients: 'Canned tuna, steamed green beans, boiled eggs, baby potatoes, olives', prep: 'Arrange salad components on a platter: tuna chunks, beans, halved eggs, potatoes, and olives with French vinaigrette.', price: '125.00' },
      { name: 'Vegetable Stir Fry', desc: 'Crisp seasonal veggies tossed in savory ginger soy sauce', ingredients: 'Broccoli, carrots, snap peas, mushrooms, soy sauce, ginger, garlic', prep: 'Flash-fry chopped vegetables in a smoking hot wok with ginger and garlic, toss with savory soy sauce glaze.', price: '105.00' },
      { name: 'Lasagna Bolognese', desc: 'Layers of pasta, rich meat ragu, and melted cheese', ingredients: 'Lasagna sheets, beef ragu sauce, creamy béchamel sauce, mozzarella', prep: 'Layer pasta sheets with rich meat ragu and creamy béchamel, top with mozzarella, and bake until bubbling and golden.', price: '145.00' },
      { name: 'Crispy Chicken Schnitzel', desc: 'Breaded chicken breast served with mushroom sauce and chips', ingredients: 'Chicken breast, breadcrumbs, egg, flour, creamy mushroom sauce', prep: 'Pound chicken flat, dredge in flour, egg, and breadcrumbs; pan-fry until golden. Serve with mushroom sauce and chips.', price: '140.00' },
      { name: 'Falafel Wrap', desc: 'Falafel balls, hummus, pickled turnip, and tahini in flatbread', ingredients: 'Falafel, flatbread wrap, hummus, pickled turnips, fresh parsley, tahini', prep: 'Spread hummus inside flatbread, add warm falafel balls, pickled turnips, and drizzle with creamy tahini sauce.', price: '110.00' },
      { name: 'Prawn & Garlic Linguine', desc: 'Pan-seared prawns tossed in white wine garlic butter', ingredients: 'Linguine pasta, prawns, white wine, garlic, butter, chili flakes', prep: 'Sauté prawns in garlic butter and chili, add white wine reduction, and toss with al dente linguine pasta.', price: '170.00' },
      { name: 'Roasted Lamb Wrap', desc: 'Shredded lamb with mint tzatziki and cucumber', ingredients: 'Shredded slow-roast lamb, pita pocket, tzatziki, cucumber, red onion', prep: 'Stuff warm pita bread with shredded lamb, crisp cucumber slices, red onion, and homemade mint tzatziki sauce.', price: '150.00' },
      { name: 'Mushroom Risotto', desc: 'Arborio rice simmered with wild mushrooms and parmesan', ingredients: 'Arborio rice, wild mushrooms, vegetable stock, white wine, parmesan cheese', prep: 'Slowly ladle warm stock into toasted arborio rice and mushrooms, stirring continuously until creamy; finish with parmesan.', price: '135.00' },
      { name: 'B.L.T. Sandwich', desc: 'Crispy bacon, fresh lettuce, and tomato on toasted bread', ingredients: 'Sliced bread, crispy bacon rashers, vine tomatoes, crisp lettuce, mayo', prep: 'Toast white bread, spread mayonnaise, layer crispy bacon, tomato slices, and lettuce leaves.', price: '95.00' }
    ],
    Dessert: [
      { name: 'New York Cheesecake', desc: 'Rich baked vanilla cheesecake with berry compote', ingredients: 'Cream cheese, sugar, graham cracker crust, sour cream, berry compote', prep: 'Bake rich cream cheese batter in graham cracker crust in water bath, chill overnight, and top with berry compote.', price: '85.00' },
      { name: 'Chocolate Brownie', desc: 'Fudgy chocolate brownie served with vanilla ice cream', ingredients: 'Dark chocolate, butter, sugar, eggs, flour, vanilla ice cream scoop', prep: 'Melt chocolate and butter, whisk with sugar and eggs, fold in flour, bake until fudgy, and serve with ice cream.', price: '75.00' },
      { name: 'Malva Pudding', desc: 'Traditional South African sponge cake with warm custard', ingredients: 'Apricot jam sponge cake, hot buttery cream caramel syrup, custard', prep: 'Bake spongy apricot jam cake, pour hot rich cream-butter-sugar syrup directly over it when it comes out of the oven.', price: '80.00' },
      { name: 'Lemon Meringue Pie', desc: 'Tart lemon curd topped with fluffy torched meringue', ingredients: 'Pastry crust, lemon curd, egg whites, sugar, cream of tartar', prep: 'Fill baked crust with lemon curd, pile whipped egg white meringue on top, and torch until peaks are golden brown.', price: '75.00' },
      { name: 'Tiramisu', desc: 'Italian coffee-soaked ladyfingers with mascarpone cream', ingredients: 'Ladyfinger biscuits, espresso coffee, mascarpone cheese, eggs, cocoa powder', prep: 'Dip ladyfingers in espresso, layer with whipped mascarpone cream mixture, dust heavily with cocoa powder, and chill.', price: '90.00' },
      { name: 'Apple Crumble', desc: 'Baked spiced apples with buttery oat crumble and custard', ingredients: 'Apples, cinnamon, brown sugar, rolled oats, flour, butter, custard', prep: 'Toss sliced apples in cinnamon and sugar, top with oat-butter crumble mixture, bake until bubbling, and serve with custard.', price: '80.00' },
      { name: 'Ice Cream Sundae', desc: 'Three scoops with chocolate sauce, nuts, and cherries', ingredients: 'Vanilla and chocolate ice cream, chocolate syrup, chopped nuts, cherries', prep: 'Scoop ice cream into a glass dish, drizzle generously with chocolate syrup, and top with crushed nuts and a cherry.', price: '70.00' },
      { name: 'Chocolate Mousse', desc: 'Light and airy dark chocolate mousse', ingredients: 'Dark chocolate, whipped heavy cream, egg whites, sugar', prep: 'Fold melted chocolate gently into whipped cream and stiff egg whites; chill in ramekins until set.', price: '75.00' },
      { name: 'Peppermint Crisp Tart', desc: 'Layered caramel, cream, and crushed mint chocolate', ingredients: 'Tennis biscuits, caramel treat, whipped cream, peppermint crisp chocolate', prep: 'Layer biscuits, caramel, and whipped cream in a dish. Top with a heavy blanket of crushed peppermint crisp chocolate.', price: '85.00' },
      { name: 'Panna Cotta', desc: 'Silky vanilla bean cream with passion fruit coulis', ingredients: 'Heavy cream, sugar, vanilla bean pod, gelatin, passion fruit pulp', prep: 'Heat cream, sugar, and vanilla; dissolve gelatin and set in moulds. Unmould and spoon passion fruit coulis over top.', price: '80.00' },
      { name: 'Banoffee Pie', desc: 'Toffee, banana, and whipped cream on biscuit crust', ingredients: 'Digestive biscuit crust, thick caramel toffee, fresh bananas, whipped cream', prep: 'Press biscuit crust, fill with caramel and sliced bananas, top with whipped cream and chocolate shavings.', price: '85.00' },
      { name: 'Churros', desc: 'Fried dough sticks rolled in cinnamon sugar with chocolate dip', ingredients: 'Churro dough, frying oil, cinnamon sugar, warm chocolate dip', prep: 'Pipe dough into hot oil in strips, fry until crispy, roll in cinnamon sugar while hot, and serve with chocolate dip.', price: '75.00' },
      { name: 'Fruit Pavlova', desc: 'Crisp meringue shell topped with cream and seasonal fruit', ingredients: 'Egg white meringue shell, whipped cream, kiwi, strawberries, passion fruit', prep: 'Bake large meringue until crisp outside and marshmallowy inside. Fill cavity with whipped cream and mixed fruits.', price: '90.00' },
      { name: 'Key Lime Pie', desc: 'Zesty lime custard in a graham cracker crust', ingredients: 'Graham crust, sweetened condensed milk, key lime juice, egg yolks', prep: 'Whisk lime juice, condensed milk, and yolks; pour into crust and bake until set. Chill before slicing.', price: '80.00' },
      { name: 'Profiteroles', desc: 'Choux pastry puffs filled with cream and warm chocolate', ingredients: 'Choux pastry puffs, whipped cream filling, warm chocolate ganache', prep: 'Bake choux buns until hollow, slice and fill with whipped cream, and drizzle warm chocolate ganache over top.', price: '85.00' },
      { name: 'Carrot Cake', desc: 'Spiced cake with cream cheese frosting and walnuts', ingredients: 'Grated carrots, flour, cinnamon, oil, cream cheese frosting, walnuts', prep: 'Bake spiced carrot sponge, layer and ice generously with smooth cream cheese frosting, garnish with chopped walnuts.', price: '75.00' },
      { name: 'Sticky Toffee Pudding', desc: 'Moist sponge cake drenched in warm toffee sauce', ingredients: 'Medjool dates, flour, butter, brown sugar, heavy cream toffee sauce', prep: 'Bake date sponge cake, puncture holes, and pour warm boiling toffee sauce over it so it absorbs fully.', price: '90.00' },
      { name: 'Crème Brûlée', desc: 'Rich custard base with a hard caramelized sugar layer', ingredients: 'Egg yolks, heavy cream, sugar, vanilla extract', prep: 'Bake vanilla custard in ramekins in water bath. Chill, dust sugar on top, and caramelize with a blowtorch.', price: '95.00' },
      { name: 'Berry Sorbet Trio', desc: 'Refreshing raspberry, mango, and lemon sorbets', ingredients: 'Raspberry purée, mango purée, lemon juice, sugar syrup', prep: 'Churn fruit purées and sugar syrup in an ice cream machine until frozen. Scoop trio of flavors into a chilled bowl.', price: '70.00' },
      { name: 'Donut Platter', desc: 'Assorted glazed and filled gourmet donuts', ingredients: 'Assorted artisan donuts with various glazes and fillings', prep: 'Arrange a colorful selection of freshly baked gourmet glazed and jelly-filled donuts on a display platter.', price: '85.00' }
    ]
  },
  Dinner: {
    Starters: [
      { name: 'Pan-Seared Scallops', desc: 'Served with pea purée and crispy pancetta', ingredients: 'Sea scallops, green peas, butter, pancetta slices, micro herbs', prep: 'Pan-sear scallops in smoking hot pan for 90 seconds per side until golden crust forms. Serve over smooth pea purée with crispy pancetta.', price: '145.00' },
      { name: 'Beef Carpaccio', desc: 'Thinly sliced raw beef with capers, arugula, and parmesan', ingredients: 'Beef tenderloin, capers, wild arugula, parmesan shavings, olive oil', prep: 'Freeze beef tenderloin slightly, slice paper-thin, arrange on plate, and garnish with arugula, capers, and parmesan.', price: '130.00' },
      { name: 'French Onion Soup', desc: 'Rich beef broth topped with melted Gruyère toast', ingredients: 'Yellow onions, beef stock, white wine, baguette slice, Gruyère cheese', prep: 'Caramelize onions slowly for 1 hour, add beef stock and wine, simmer. Top with toasted bread and gruyere, broil until melted.', price: '95.00' },
      { name: 'Lobster Bisque', desc: 'Luxurious creamy soup with morsels of lobster meat', ingredients: 'Lobster shells, heavy cream, tomato paste, brandy, butter, lobster chunks', prep: 'Simmer roasted shells with aromatics, brandy, and cream. Strain smooth and stir in tender chunks of cooked lobster meat.', price: '140.00' },
      { name: 'Arancini Balls', desc: 'Crispy risotto balls stuffed with mozzarella and peas', ingredients: 'Risotto rice, mozzarella cubes, green peas, breadcrumbs, egg', prep: 'Roll cold risotto around mozzarella and peas, coat in breadcrumbs, and deep-fry until crunchy and melted inside.', price: '90.00' },
      { name: 'Duck Liver Parfait', desc: 'Rich paté served with fig chutney and brioche', ingredients: 'Duck livers, butter, port wine, shallots, fig chutney, toasted brioche', prep: 'Blend sautéed duck livers with butter and port wine until silky. Chill and serve with sweet fig chutney and warm brioche.', price: '125.00' },
      { name: 'Garlic Butter Snails', desc: 'Traditional escargot baked in herb garlic butter', ingredients: 'Burgundy snails, garlic herb butter, parsley, baguette', prep: 'Place snails in escargot dishes, fill cavities generously with garlic herb butter, and bake until bubbling hot.', price: '115.00' },
      { name: 'Tuna Tartare', desc: 'Fresh diced tuna with avocado, soy, and sesame crackers', ingredients: 'Sushi-grade tuna, avocado, soy sauce, sesame oil, wonton crackers', prep: 'Dice fresh tuna and avocado, toss with soy and sesame oil, mold into a ring, and serve with crispy wonton crackers.', price: '135.00' },
      { name: 'Baked Camembert', desc: 'Whole wheel of cheese baked with garlic, rosemary, and honey', ingredients: 'Camembert cheese wheel, garlic cloves, fresh rosemary, honey', prep: 'Score top of camembert, insert garlic and rosemary, drizzle with honey, and bake at 180°C until gooey and molten.', price: '150.00' },
      { name: 'Crispy Pork Belly Bites', desc: 'Glazed with sweet soy, ginger, and sesame', ingredients: 'Pork belly cubes, soy sauce, fresh ginger, honey, sesame seeds', prep: 'Slow-roast pork belly until tender, cube and crisp in a pan, toss in a sticky ginger soy glaze and garnish with sesame seeds.', price: '120.00' },
      { name: 'Wild Mushroom Tart', desc: 'Sautéed mushrooms in puff pastry with goat cheese', ingredients: 'Puff pastry, assorted wild mushrooms, garlic, thyme, goat cheese', prep: 'Sauté mushrooms with garlic and thyme. Spread over puff pastry sheet, top with goat cheese, and bake until pastry puffs.', price: '105.00' },
      { name: 'Prawn Tempura', desc: 'Lightly battered prawns with sweet ginger dipping sauce', ingredients: 'Large prawns, tempura flour, ice water, sweet chili ginger dip', prep: 'Coat prawns in ice-cold tempura batter, deep fry immediately until light, crispy, and golden; serve with dip.', price: '130.00' },
      { name: 'Beetroot Carpaccio', desc: 'Sliced roasted beets with walnuts and balsamic reduction', ingredients: 'Red and golden beets, toasted walnuts, goat cheese, balsamic glaze', prep: 'Roast beets until tender, slice paper-thin on a mandate, fan out on plate, and garnish with walnuts and glaze.', price: '95.00' },
      { name: 'Classic Caesar Salad', desc: 'Crisp romaine, parmesan crisps, and anchovy dressing', ingredients: 'Romaine hearts, parmesan crisps, house anchovy dressing, croutons', prep: 'Toss crisp romaine leaves with traditional handmade Caesar dressing, top with parmesan crisps and croutons.', price: '90.00' },
      { name: 'Oysters Rockefeller', desc: 'Baked oysters with spinach, butter, and breadcrumbs', ingredients: 'Fresh oysters on half shell, spinach puree, butter, breadcrumbs', prep: 'Top shucked oysters with seasoned spinach and butter mixture, dust with breadcrumbs, and broil until golden.', price: '160.00' },
      { name: 'Beef Skewer Appetizer', desc: 'Marinated beef strips with chimichurri dip', ingredients: 'Beef fillet strips, garlic, olive oil, fresh herbs chimichurri sauce', prep: 'Thread marinated beef strips onto skewers, grill quickly over high heat, and serve with vibrant green chimichurri.', price: '120.00' },
      { name: 'Asparagus Prosciutto', desc: 'Grilled asparagus wrapped in cured ham with hollandaise', ingredients: 'Fresh asparagus spears, prosciutto ham, hollandaise sauce', prep: 'Blanch asparagus, bundle in groups of three, wrap tightly with prosciutto, and grill until ham is crisp.', price: '110.00' },
      { name: 'Crab Cakes', desc: 'Pan-fried lump crab patties with remoulade sauce', ingredients: 'Lump crab meat, mayonnaise, breadcrumbs, Dijon, herbs, remoulade', prep: 'Mix crab gently with binding ingredients, form into patties, pan-fry until golden brown on both sides; serve with remoulade.', price: '140.00' },
      { name: 'Gorgonzola Pear Salad', desc: 'Mixed greens, sliced pear, walnuts, and blue cheese', ingredients: 'Mixed salad greens, ripe pear slices, candied walnuts, gorgonzola cheese', prep: 'Toss greens with light vinaigrette, top with fan-sliced fresh pears, crumbled gorgonzola, and candied walnuts.', price: '100.00' },
      { name: 'Mussels Mariniere', desc: 'Fresh mussels steamed in white wine, garlic, and cream', ingredients: 'Fresh black mussels, white wine, garlic, shallots, heavy cream, parsley', prep: 'Steam cleaned mussels in a pot with white wine, garlic, shallots, and cream until shells open wide. Garnish with parsley.', price: '135.00' }
    ],
    Mains: [
      { name: 'Fillet Mignon', desc: 'Tender 300g beef fillet with truffle mash and red wine jus', ingredients: 'Beef fillet steak, potatoes, butter, heavy cream, truffle oil, red wine jus', prep: 'Pan-sear fillet to desired doneness. Serve alongside silky whipped truffle mashed potatoes and rich red wine jus.', price: '280.00' },
      { name: 'Rack of Lamb', desc: 'Herb-crusted lamb cutlets with roasted baby potatoes', ingredients: 'Lamb rack, breadcrumbs, rosemary, garlic, Dijon mustard, baby potatoes', prep: 'Coat lamb rack in Dijon and herb breadcrumb crust, roast to medium-rare. Serve with roasted baby potatoes.', price: '295.00' },
      { name: 'Pan-Roasted Salmon', desc: 'Atlantic salmon with lemon butter sauce and asparagus', ingredients: 'Salmon fillet, lemon juice, butter, garlic, fresh asparagus spears', prep: 'Pan-roast salmon skin-side down until crispy, flip for 1 minute. Drizzle with pan lemon-butter sauce alongside asparagus.', price: '240.00' },
      { name: 'Lobster Thermidor', desc: 'Whole lobster baked in rich cream, mustard, and cheese', ingredients: 'Whole lobster, heavy cream, Dijon mustard, gruyere cheese, egg yolk', prep: 'Remove lobster meat, mix with rich cream and mustard sauce, stuff back into shell, top with gruyere, and broil until bubbly.', price: '350.00' },
      { name: 'Duck Breast Orange Glaze', desc: 'Crispy skin duck breast with potato gratin', ingredients: 'Duck breast, fresh orange juice, honey, potato gratin dauphinois', prep: 'Score duck skin, render fat slowly in pan until crispy, finish in oven. Slice and serve with tangy orange honey reduction.', price: '265.00' },
      { name: 'Ribeye Steak', desc: '350g grain-fed ribeye with bone marrow butter and chips', ingredients: 'Ribeye steak, bone marrow butter, hand-cut chips, seasoning', prep: 'Grill ribeye over high charcoal heat for rich marbling flavor. Top with melting bone marrow butter; serve with chips.', price: '290.00' },
      { name: 'Chicken Supreme', desc: 'Stuffed chicken breast with wild mushroom sauce', ingredients: 'Chicken breast with wing bone, wild mushrooms, cream, garlic, thyme', prep: 'Pan-sear chicken supreme, finish in oven. Create rich wild mushroom and cream sauce to spoon generously over top.', price: '210.00' },
      { name: 'Seafood Paella', desc: 'Saffron rice loaded with prawns, mussels, and calamari', ingredients: 'Bomba rice, saffron, prawns, mussels, calamari, fish stock, peppers', prep: 'Simmer bomba rice in rich saffron fish stock with seafood until crust forms at the bottom of the pan.', price: '270.00' },
      { name: 'Butternut Ravioli', desc: 'Handmade pasta pockets in a sage brown butter sauce', ingredients: 'Pasta dough, roasted butternut filling, butter, fresh sage leaves, parmesan', prep: 'Boil handmade ravioli until floating. Toss gently in a pan with foaming brown butter and crispy fresh sage leaves.', price: '195.00' },
      { name: 'Pork Belly Roast', desc: 'Crispy crackling pork belly with apple purée', ingredients: 'Pork belly block, salt crust, homemade apple purée, roasting jus', prep: 'Roast pork belly with salted skin until crackling is blistered and crisp. Serve sliced with smooth apple purée.', price: '250.00' },
      { name: 'Venison Loin', desc: 'Wild venison medallions with berry reduction', ingredients: 'Venison loin medallions, red berries, port wine, butter, juniper berries', prep: 'Pan-sear venison medallions to medium-rare. Deglaze pan with port wine and berries to create a glossy game reduction.', price: '310.00' },
      { name: 'Halibut Steak', desc: 'Pan-fried halibut with caper butter and baby vegetables', ingredients: 'Halibut steak, capers, butter, lemon, baby carrots and zucchini', prep: 'Pan-fry halibut until flaky and tender. Make brown butter caper sauce and pour over fish with steamed baby veggies.', price: '285.00' },
      { name: 'Vegetable Wellington', desc: 'Puff pastry filled with lentils, mushrooms, and nuts', ingredients: 'Puff pastry, cooked lentils, mushrooms, chestnuts, herbs', prep: 'Sauté lentils, mushrooms, and nuts; wrap tightly in puff pastry sheet and bake until golden brown and flaky.', price: '185.00' },
      { name: 'Osso Buco', desc: 'Slow-braised veal shanks with gremolata and risotto', ingredients: 'Veal shanks, white wine, broth, tomatoes, gremolata (lemon zest, garlic, parsley)', prep: 'Braises veal shanks in wine and broth for 3 hours until falling off the bone. Garnish with fresh gremolata.', price: '290.00' },
      { name: 'Grilled Kingklip', desc: 'Local firm white fish with lemon herb butter', ingredients: 'Kingklip fillet, lemon juice, parsley, butter, olive oil', prep: 'Grill kingklip fillet until tender and flaky. Finish with a bright squeeze of lemon and fresh herb butter.', price: '255.00' },
      { name: 'Beef Bourguignon', desc: 'Classic French beef stew slow-cooked in red wine', ingredients: 'Beef chuck cubes, red burgundy wine, bacon lardons, pearl onions, mushrooms', prep: 'Slow-braise beef chuck in red wine with bacon, pearl onions, and mushrooms for hours until meltingly tender.', price: '240.00' },
      { name: 'Garlic Butter Prawn Platter', desc: 'Queen prawns sautéed in garlic chili butter', ingredients: 'Queen prawns, garlic cloves, chili flakes, butter, lemon juice', prep: 'Sauté prawns in a scorching pan with lots of garlic, butter, and chili flakes until pink and fragrant.', price: '280.00' },
      { name: 'Stuffed Bell Peppers', desc: 'Quinoa, black beans, and spiced cheese bake', ingredients: 'Bell peppers, cooked quinoa, black beans, corn, cumin, cheddar', prep: 'Stuff hollowed bell peppers with seasoned quinoa, beans, and corn mix; top with cheese and bake until tender.', price: '175.00' },
      { name: 'T-Bone Steak', desc: '400g prime cut with onion rings and peppercorn sauce', ingredients: 'T-bone steak, beer batter onion rings, creamy green peppercorn sauce', prep: 'Flame-grill T-bone steak. Serve with crispy onion rings and a warm pitcher of creamy peppercorn sauce.', price: '320.00' },
      { name: 'Crispy Skin Seabass', desc: 'Seabass fillet served over creamy saffron risotto', ingredients: 'Seabass fillet, arborio rice, saffron threads, parmesan, cream', prep: 'Pan-sear seabass skin-side down until ultra crispy. Serve atop a bed of creamy, vibrant yellow saffron risotto.', price: '295.00' }
    ],
    Dessert: [
      { name: 'Decadent Chocolate Lava Cake', desc: 'Warm cake with a molten chocolate center and ice cream', ingredients: 'Dark chocolate, butter, eggs, sugar, flour, vanilla ice cream', prep: 'Bake chocolate cake batter at high heat for 12 minutes so edges set while center remains gooey and molten. Serve with ice cream.', price: '95.00' },
      { name: 'Classic Crème Brûlée', desc: 'Vanilla custard with torched crunchy sugar top', ingredients: 'Egg yolks, heavy cream, sugar, vanilla bean pods', prep: 'Bake vanilla custard in ramekins, chill, cover with sugar layer, and torch until hardened into a glass-like caramel shell.', price: '90.00' },
      { name: 'Sticky Toffee Pudding', desc: 'Rich date sponge with warm butterscotch sauce', ingredients: 'Medjool dates, flour, baking soda, butter, brown sugar butterscotch sauce', prep: 'Bake moist sponge cake packed with puréed dates. Drench in rich hot butterscotch sauce before serving.', price: '85.00' },
      { name: 'Tiramisu Classico', desc: 'Espresso-infused Italian mascarpone dessert', ingredients: 'Savoiardi biscuits, espresso, mascarpone cheese, eggs, cocoa powder', prep: 'Layer coffee-dipped ladyfingers with whipped sweet mascarpone cream; dust generously with cocoa powder.', price: '95.00' },
      { name: 'Berry Panna Cotta', desc: 'Silky cream dessert with mixed berry coulis', ingredients: 'Heavy cream, vanilla bean, sugar, gelatin, mixed berry coulis', prep: 'Simmer cream with vanilla and sugar, set with gelatin in moulds, and invert onto plate with berry coulis.', price: '85.00' },
      { name: 'Lemon Tart', desc: 'Zesty curd in buttery pastry with clotted cream', ingredients: 'Shortcrust pastry case, lemon curd filling, clotted cream dollop', prep: 'Pour smooth lemon curd into baked pastry shell, let set, slice, and serve with a dollop of clotted cream.', price: '80.00' },
      { name: 'Apple Tart Tatin', desc: 'Caramelized upside-down apple pastry with vanilla ice cream', ingredients: 'Apples, caramel sugar, puff pastry sheet, vanilla ice cream', prep: 'Caramelize sugar and apples in a pan, cover with puff pastry, bake, and flip upside down onto a serving plate.', price: '90.00' },
      { name: 'Passion Fruit Cheesecake', desc: 'Baked cheesecake with tropical glaze', ingredients: 'Cream cheese base, biscuit crust, fresh passion fruit seed glaze', prep: 'Bake classic New York cheesecake, cool, and top with vibrant, tangy passion fruit seed glaze.', price: '85.00' },
      { name: 'Affogato al Caffè', desc: 'Espresso poured over a scoop of vanilla bean gelato', ingredients: 'Vanilla bean gelato scoop, shot of hot espresso coffee', prep: 'Place a cold scoop of premium vanilla gelato in a small glass and pour a piping hot shot of espresso directly over it.', price: '70.00' },
      { name: 'Profiterole Tower', desc: 'Choux pastry filled with cream and drenched in hot chocolate', ingredients: 'Choux pastry puffs, pastry cream filling, hot chocolate sauce', prep: 'Fill choux buns with cream, stack into a small pyramid tower, and pour warm liquid chocolate sauce over the top.', price: '95.00' },
      { name: 'Baked Alaska', desc: 'Ice cream sponge encased in torched meringue', ingredients: 'Sponge cake base, ice cream center, whipped egg white meringue', prep: 'Cover ice cream and sponge cake completely in meringue, and quickly brown the exterior with a culinary torch.', price: '110.00' },
      { name: 'Dark Chocolate Truffle Tart', desc: 'Rich ganache in shortcrust pastry shell', ingredients: 'Shortcrust pastry, dark chocolate ganache, cocoa dusting', prep: 'Pour rich, silky chocolate ganache into baked tart crust, refrigerate until firm, and dust with cocoa.', price: '90.00' },
      { name: 'Poached Pear in Red Wine', desc: 'Spiced pear served with mascarpone cream', ingredients: 'Pears, red wine, cinnamon sticks, star anise, sugar, mascarpone', prep: 'Poach peeled pears gently in spiced red wine syrup until ruby red and tender. Serve warm with mascarpone cream.', price: '85.00' },
      { name: 'Mango Sorbet in Crystal Glass', desc: 'Refreshing handcrafted fruit sorbet', ingredients: 'Ripe mango purée, simple syrup, lemon juice', prep: 'Blend mango purée with simple syrup and lemon juice, freeze and churn until smooth sorbet forms.', price: '75.00' },
      { name: 'Hazelnut Praline Mousse', desc: 'Smooth hazelnut chocolate creation', ingredients: 'Hazelnut praline paste, dark chocolate, whipped cream', prep: 'Fold hazelnut praline paste into chocolate mousse base, chill until light and airy.', price: '95.00' },
      { name: 'Traditional Malva Pudding', desc: 'Spongy apricot cake served piping hot with custard', ingredients: 'Sponge cake, apricot jam, cream, butter, custard', prep: 'Bake apricot sponge, soak with hot creamy syrup immediately out of the oven, and serve with hot custard.', price: '80.00' },
      { name: 'Cheesecake Platter Selection', desc: 'Trio of mini gourmet cheesecakes', ingredients: 'Mini baked cheesecakes (Berry, Chocolate, Vanilla)', prep: 'Prepare three distinct mini cheesecake flavors on a tasting slate for sharing.', price: '105.00' },
      { name: 'White Chocolate Raspberry Opera', desc: 'Layered almond sponge and cream cake', ingredients: 'Almond sponge, white chocolate ganache, raspberry layers', prep: 'Layer delicate almond sponge sheets with white chocolate ganache and tart raspberry puree.', price: '95.00' },
      { name: 'Fig and Honey Tart', desc: 'Fresh seasonal figs with honey glaze and mascarpone', ingredients: 'Pastry crust, mascarpone cheese, fresh figs, honey glaze', prep: 'Fill tart crust with whipped mascarpone, arrange sliced fresh figs on top, and brush with honey.', price: '90.00' },
      { name: 'Artisan Cheese & Biscuit Board', desc: 'Selection of fine cheeses, grapes, and crackers', ingredients: 'Brie, blue cheese, cheddar, water biscuits, grapes, preserves', prep: 'Arrange a selection of aged and soft cheeses with crackers, fresh grapes, and fig preserves.', price: '140.00' }
    ]
  },
  'Late Night': {
    Starters: [
      { name: 'Midnight Nachos', desc: 'Tortilla chips loaded with melted cheese, jalapeños, and salsa', ingredients: 'Corn tortilla chips, shredded cheese blend, pickled jalapeños, salsa', prep: 'Layer tortilla chips on a tray, cover with cheese and jalapeños, broil until melted, and top with salsa.', price: '95.00' },
      { name: 'Loaded Fries', desc: 'Crispy fries topped with bacon bits, cheese sauce, and ranch', ingredients: 'French fries, warm cheddar cheese sauce, bacon bits, ranch dressing', prep: 'Deep-fry fries until golden, pour warm cheddar cheese sauce over them, and top with crispy bacon bits and ranch.', price: '85.00' },
      { name: 'Mozzarella Sticks', desc: 'Breaded cheese sticks served with warm marinara dip', ingredients: 'Mozzarella sticks, breadcrumbs, Italian herbs, marinara sauce', prep: 'Freeze cheese sticks, coat in egg and breadcrumbs, deep-fry until golden, and serve with warm marinara.', price: '80.00' },
      { name: 'Jalapeño Poppers', desc: 'Cream cheese stuffed spicy peppers, deep-fried', ingredients: 'Jalapeño peppers, cream cheese filling, batter crust', prep: 'Stuff halved jalapeños with cream cheese, dip in batter, and deep-fry until crisp and bubbly.', price: '85.00' },
      { name: 'Onion Rings', desc: 'Crispy battered onion rings with BBQ dipping sauce', ingredients: 'Colossal onion rings, seasoned beer batter, BBQ sauce', prep: 'Slice onions into thick rings, dip in seasoned batter, and deep-fry until crunchy.', price: '65.00' },
      { name: 'Mini Sliders', desc: 'Two bite-sized beef cheeseburgers', ingredients: 'Mini beef patties, slider buns, cheese slices, pickles', prep: 'Quickly pan-fry mini beef patties, melt cheese, and assemble on slider buns with pickles.', price: '90.00' },
      { name: 'Spicy Chicken Tenders', desc: 'Crispy fried strips with honey mustard', ingredients: 'Chicken breast strips, breadcrumbs, cayenne pepper, honey mustard', prep: 'Coat chicken strips in spicy breadcrumbs, fry until golden and crispy, and serve with honey mustard.', price: '85.00' },
      { name: 'Garlic Bread Bites', desc: 'Bite-sized garlic butter dough balls', ingredients: 'Pizza dough bites, garlic butter, parmesan cheese', prep: 'Roll dough into bite-sized balls, bake, toss immediately in melted garlic butter and parmesan.', price: '60.00' },
      { name: 'Cheese Quesadilla Wedges', desc: 'Toasted tortilla filled with melted cheese and salsa', ingredients: 'Tortillas, shredded Mexican cheese, salsa', prep: 'Fill tortillas with cheese, toast on a skillet until crisp and melted, and slice into wedges.', price: '75.00' },
      { name: 'Salt & Pepper Calamari', desc: 'Crispy squid rings with chili flakes', ingredients: 'Squid rings, cornstarch, sea salt, cracked black pepper, chili flakes', prep: 'Toss squid rings in salt, pepper, and starch; flash fry until tender and crisp.', price: '95.00' },
      { name: 'Potato Wedges', desc: 'Seasoned wedges with sour cream and sweet chili', ingredients: 'Potato wedges, cajun spice, sour cream, sweet chili sauce', prep: 'Bake potato wedges tossed in cajun seasoning until crisp, and serve with sour cream and sweet chili dip.', price: '70.00' },
      { name: 'Spring Roll Trio', desc: 'Crispy veggie spring rolls with plum sauce', ingredients: 'Vegetable spring rolls, plum dipping sauce', prep: 'Deep-fry frozen or fresh veggie spring rolls until golden brown and serve with plum sauce.', price: '70.00' },
      { name: 'Mac & Cheese Bites', desc: 'Deep-fried macaroni and cheese squares', ingredients: 'Leftover mac and cheese, breadcrumb coating', prep: 'Chill mac and cheese until firm, cut into squares, bread, and deep-fry until crunchy.', price: '80.00' },
      { name: 'Chicken Wings (Spicy BBQ)', desc: 'Sticky caramelized wings', ingredients: 'Chicken wings, BBQ sauce, honey, chili powder', prep: 'Bake wings until skin is rendered, then toss in sticky BBQ honey glaze and broil.', price: '95.00' },
      { name: 'Tortilla Chips & Guacamole', desc: 'Freshly smashed avo dip with corn chips', ingredients: 'Corn chips, ripe avocados, lime, tomato, onion, cilantro', prep: 'Mash ripe avocados with lime juice, diced tomato, onion, and cilantro; serve with corn chips.', price: '85.00' },
      { name: 'Pretzel Bites & Cheese', desc: 'Warm soft pretzel nuggets with warm cheddar dip', ingredients: 'Pretzel dough nuggets, coarse salt, warm cheddar sauce', prep: 'Boil pretzel bites in baking soda water briefly, bake until golden, and serve with warm cheddar dip.', price: '75.00' },
      { name: 'Mini Corn Dogs', desc: 'Bite-sized frankfurters in sweet cornbread batter', ingredients: 'Mini frankfurters, sweet cornbread batter, frying oil', prep: 'Dip mini frankfurters into thick sweet cornbread batter and deep-fry until golden brown.', price: '70.00' },
      { name: 'Poutine Bowl', desc: 'Fries smothered in rich gravy and cheese curds', ingredients: 'French fries, cheese curds, rich brown meat gravy', prep: 'Pile hot fries in a bowl, top with cheese curds, and pour hot brown gravy over everything to melt the curds.', price: '90.00' },
      { name: 'Sweet Potato Fries', desc: 'Crispy sweet potato batons with garlic mayo', ingredients: 'Sweet potato batons, garlic aioli mayo dip', prep: 'Bake or fry sweet potato batons until tender inside and crisp outside; serve with garlic mayo.', price: '75.00' },
      { name: 'Halloumi Fries', desc: 'Crispy fried cheese sticks with pomegranate drizzle', ingredients: 'Halloumi cheese sticks, flour coating, pomegranate molasses', prep: 'Dust halloumi sticks lightly in flour, pan-fry until golden on all sides, and drizzle with pomegranate molasses.', price: '90.00' }
    ],
    Mains: [
      { name: 'Midnight Smash Burger', desc: 'Double beef patty, American cheese, special sauce, and fries', ingredients: 'Two beef patties, American cheese, special burger sauce, bun, fries', prep: 'Smash beef balls hard onto a screaming hot skillet, flip, add cheese, stack, and serve in a bun with sauce and fries.', price: '130.00' },
      { name: 'Late Night Pepperoni Pizza', desc: 'Extra cheese and spicy pepperoni wood-fired pizza', ingredients: 'Pizza dough, mozzarella, spicy pepperoni slices, tomato base', prep: 'Top stretched dough with sauce, heavy mozzarella, and lots of pepperoni; bake until crust is charred and bubbly.', price: '140.00' },
      { name: 'Chili Cheese Dog', desc: 'Jumbo hot dog topped with beef chili and melted cheddar', ingredients: 'Jumbo frankfurter, hot dog roll, beef chili con carne, cheddar cheese', prep: 'Grill hot dog, place in roll, ladle hot beef chili over top, and cover with melted cheddar cheese.', price: '105.00' },
      { name: 'Loaded Burrito', desc: 'Steak, beans, rice, cheese, and sour cream wrapped tightly', ingredients: 'Tortilla, sliced steak, refried beans, Mexican rice, cheese, sour cream', prep: 'Layer steak, rice, beans, and cheese on tortilla, fold burrito ends in, roll tightly, and toast on flat top.', price: '135.00' },
      { name: 'Midnight Ramen', desc: 'Rich broth, noodles, soft-boiled egg, and pork slices', ingredients: 'Ramen noodles, pork bone broth, chashu pork, soft-boiled egg, nori', prep: 'Boil noodles, submerge in hot rich broth, and arrange pork slices, halved egg, and nori sheet on top.', price: '125.00' },
      { name: 'Philly Cheesesteak', desc: 'Sliced beef, bell peppers, and melted provolone in a sub roll', ingredients: 'Thin shaved beef, bell peppers, onions, provolone cheese, sub roll', prep: 'Sauté beef, peppers, and onions on a flat top, pile into a sub roll, and cover with melted provolone cheese.', price: '140.00' },
      { name: 'Crispy Fried Chicken Burger', desc: 'Spicy chicken fillet with coleslaw and pickles', ingredients: 'Chicken fillet, buttermilk, spicy coating, brioche bun, pickles', prep: 'Soak chicken in buttermilk, coat in seasoned flour, deep-fry until crispy, and serve in a bun with pickles and slaw.', price: '120.00' },
      { name: 'Steak & Egg Roll', desc: 'Late night steak roll topped with a fried egg', ingredients: 'Minute steak, crusty roll, fried egg, BBQ sauce', prep: 'Pan-fry minute steak quickly, place in a fresh crusty roll with a sunny-side up fried egg and BBQ sauce.', price: '145.00' },
      { name: 'Loaded Macaroni & Cheese', desc: 'Creamy cheddar pasta topped with bacon and breadcrumbs', ingredients: 'Macaroni, sharp cheddar sauce, bacon bits, breadcrumb crust', prep: 'Mix cooked macaroni into heavy cheddar sauce, top with bacon and crumbs, and bake until golden and bubbly.', price: '110.00' },
      { name: 'BBQ Ribs Basket', desc: 'Half rack of sticky pork ribs with chips', ingredients: 'Pork ribs, sticky BBQ glaze, hand-cut chips', prep: 'Bake pork ribs until tender, brush heavily with sticky BBQ glaze, char on grill, and serve with chips.', price: '160.00' },
      { name: 'Chicken Fajita Wrap', desc: 'Sizzling chicken strips, peppers, and onions in tortilla', ingredients: 'Chicken strips, bell peppers, onions, fajita spices, tortilla', prep: 'Sauté chicken and vegetables with fajita spices until charred; wrap tightly in a flour tortilla.', price: '120.00' },
      { name: 'Late Night Fish Tacos', desc: 'Crispy fish strips, slaw, and chipotle mayo in taco shells', ingredients: 'Crispy fish strips, taco shells, cabbage slaw, chipotle mayonnaise', prep: 'Place crispy fish strips into taco shells, top with crunchy cabbage slaw and spicy chipotle mayo.', price: '125.00' },
      { name: 'Bacon & Egg Burger', desc: 'Classic diner burger with fried egg and bacon', ingredients: 'Beef patty, bacon rashers, fried egg, cheddar, burger bun', prep: 'Cook burger patty, layer with bacon and a fried egg so the yolk breaks over the patty inside a soft bun.', price: '115.00' },
      { name: 'Meat Lover Calzone', desc: 'Folded pizza stuffed with ham, pepperoni, and sausage', ingredients: 'Pizza dough, ham, pepperoni, sausage, mozzarella, tomato dip', prep: 'Fill pizza dough with assorted meats and cheese, fold in half, crimp edges, and bake until golden; serve with dip.', price: '145.00' },
      { name: 'Loaded Waffle Fries', desc: 'Waffle fries topped with pulled pork and melted cheese', ingredients: 'Waffle fries, slow-cooked pulled pork, melted cheese sauce', prep: 'Bake waffle fries until crisp, pile warm pulled pork over top, and drench in melted cheese sauce.', price: '130.00' },
      { name: 'Pad Thai Noodles', desc: 'Stir-fried rice noodles with chicken, peanuts, and lime', ingredients: 'Rice noodles, chicken, bean sprouts, crushed peanuts, tamarind sauce', prep: 'Stir-fry rice noodles in a wok with chicken, egg, and tamarind sauce; garnish with crushed peanuts and lime.', price: '135.00' },
      { name: 'Mega Club Sandwich', desc: 'Massive toasted sandwich with chicken, bacon, and fries', ingredients: 'Three toast slices, chicken, bacon, lettuce, tomato, fries', prep: 'Assemble a towering triple-decker sandwich with chicken and bacon; serve alongside a mountain of fries.', price: '125.00' },
      { name: 'Creamy Mushroom Pasta', desc: 'Late-night comfort bowl of fettuccine and mushrooms', ingredients: 'Fettuccine pasta, mushrooms, garlic, heavy cream, parmesan', prep: 'Sauté mushrooms in garlic, stir in heavy cream to make a rich sauce, and toss with boiled fettuccine.', price: '120.00' },
      { name: 'Gyro Pita Pocket', desc: 'Sliced lamb, tzatziki, lettuce, and tomato in pita bread', ingredients: 'Gyro meat slices, warm pita, tzatziki sauce, tomato, onion', prep: 'Stuff warm pita bread with sliced gyro meat, chopped tomato, onion, and cool tzatziki sauce.', price: '115.00' },
      { name: 'Sliders Trio Plate', desc: 'Three different mini burgers with chips', ingredients: 'Three mini sliders (Cheese, BBQ, Bacon), chips basket', prep: 'Prepare three unique mini slider variations served together with a basket of hot chips.', price: '150.00' }
    ],
    Dessert: [
      { name: 'Midnight Chocolate Fudge Cake', desc: 'Rich, moist chocolate cake slice', ingredients: 'Chocolate sponge, thick fudge frosting', prep: 'Bake rich chocolate cake and cover thickly with glossy fudge frosting; serve at room temperature.', price: '75.00' },
      { name: 'Warm Chocolate Chip Cookies', desc: 'Three freshly baked cookies with molten chocolate', ingredients: 'Cookie dough, dark chocolate chunks, sea salt', prep: 'Bake freshly scooped cookie dough balls for 9 minutes so centers remain soft and molten.', price: '60.00' },
      { name: 'Ice Cream Tub (Vanilla Bean)', desc: 'Generous scoop of cold artisan ice cream', ingredients: 'Premium vanilla bean ice cream tub', prep: 'Scoop generous portions of ice cream directly from the freezer into a chilled serving bowl.', price: '50.00' },
      { name: 'Nutella Waffle', desc: 'Warm waffle slathered in thick hazelnut chocolate', ingredients: 'Belgian waffle, thick Nutella spread, powdered sugar', prep: 'Toast waffle until warm and crisp, spread a thick layer of Nutella over top while warm.', price: '85.00' },
      { name: 'Donut Bites with Caramel', desc: 'Six mini sugar donuts with warm caramel dip', ingredients: 'Mini plain donuts, cinnamon sugar, warm caramel sauce', prep: 'Toss warm mini donuts in cinnamon sugar, serve alongside a dipping bowl of warm caramel sauce.', price: '65.00' },
      { name: 'Apple Pie Slice', desc: 'Classic warm apple pie with cinnamon sugar', ingredients: 'Apple pie pastry crust, spiced sliced apples', prep: 'Bake spiced apple pie until pastry is crisp and golden; serve a warm slice.', price: '70.00' },
      { name: 'Brownie Sundae', desc: 'Fudgy brownie with ice cream and chocolate syrup', ingredients: 'Chocolate brownie, ice cream scoop, chocolate syrup', prep: 'Warm a fudgy brownie square, top with a cold scoop of ice cream and chocolate syrup.', price: '85.00' },
      { name: 'Marshmallow Rice Crispy Treat', desc: 'Chewy buttery marshmallow square', ingredients: 'Crispy rice cereal, melted marshmallows, butter', prep: 'Melt butter and marshmallows, mix with crispy rice cereal, press into pan, and cool to set.', price: '45.00' },
      { name: 'Peanut Butter Cupcake', desc: 'Moist chocolate cupcake with peanut butter frosting', ingredients: 'Chocolate cupcake, peanut butter buttercream frosting', prep: 'Bake chocolate cupcakes and pipe a high swirl of whipped peanut butter frosting on top.', price: '55.00' },
      { name: 'Churros with Chocolate', desc: 'Late night fried dough sticks with thick dipping sauce', ingredients: 'Churro dough, cinnamon sugar, thick chocolate dip', prep: 'Deep fry churro dough sticks, coat in sugar, and serve with thick hot chocolate dipping sauce.', price: '75.00' },
      { name: 'Milk Tart Slice', desc: 'Traditional South African milky custard tart', ingredients: 'Sweet pastry crust, milky cinnamon custard filling', prep: 'Bake smooth milky custard inside pastry crust, dust heavily with cinnamon powder, and chill.', price: '60.00' },
      { name: 'Lemonade Sorbet', desc: 'Tangy and icy palate cleanser', ingredients: 'Lemon juice, sugar syrup, water, crushed ice', prep: 'Churn fresh lemon juice and simple syrup in an ice cream maker until icy and smooth.', price: '55.00' },
      { name: 'Strawberry Milkshake Float', desc: 'Rich milkshake topped with vanilla ice cream', ingredients: 'Strawberry syrup, milk, vanilla ice cream scoop', prep: 'Blend strawberry syrup and milk into a thick shake, float a scoop of vanilla ice cream on top.', price: '70.00' },
      { name: 'Red Velvet Cupcake', desc: 'Classic cake with cream cheese swirl', ingredients: 'Red velvet sponge, cream cheese frosting', prep: 'Bake cocoa-infused red sponge cupcakes and frost with tangy cream cheese frosting.', price: '55.00' },
      { name: 'Banana Split Bowl', desc: 'Banana, ice cream, nuts, and chocolate drizzle', ingredients: 'Banana split in half, three ice cream scoops, nuts, syrup', prep: 'Place split banana in a long dish, add three scoops of ice cream between it, and garnish with nuts and syrup.', price: '85.00' },
      { name: 'Sticky Cinnamon Roll', desc: 'Warm gooey bun for late-night sugar cravings', ingredients: 'Cinnamon roll dough, brown sugar butter glaze', prep: 'Bake large cinnamon roll until gooey in center and glaze with sweet butter syrup.', price: '65.00' },
      { name: 'Oreo Cheesecake Slice', desc: 'Creamy cheesecake loaded with crushed cookies', ingredients: 'Oreo crumb crust, cream cheese filling, crushed Oreos', prep: 'Mix crushed Oreos into cheesecake batter and crust; bake, chill, and slice.', price: '80.00' },
      { name: 'Berry Smoothie Cup', desc: 'Chilled berry blend dessert drink', ingredients: 'Mixed berries, yogurt, honey, ice', prep: 'Blend berries, yogurt, honey, and ice until smooth and creamy; serve in a tall cup.', price: '60.00' },
      { name: 'Waffle Cone Ice Cream', desc: 'Double scoop in a crunchy cone', ingredients: 'Waffle cone, two ice cream scoops of choice', prep: 'Scoop two heavy scoops of artisan ice cream into a crisp waffle cone.', price: '65.00' },
      { name: 'Midnight Chocolate Mousse Cup', desc: 'Fluffy chilled chocolate dessert', ingredients: 'Wheeled chocolate mousse cream', prep: 'Whisk chocolate mousse until airy and chill in individual glass cups.', price: '70.00' }
    ]
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('menu');

  // Form State
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starters');
  const [price, setPrice] = useState('');

  // Data & Editing State
  const [menuItems, setMenuItems] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('Dinner');

  // Dish Info Modal / Expanded State (Tracks which suggestion index is showing details)
  const [expandedInfoKey, setExpandedInfoKey] = useState(null);

  // Feedback State
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSaveDish = () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!dishName.trim()) {
      setErrorMessage('Please enter a dish name.');
      return;
    }
    if (!description.trim()) {
      setErrorMessage('Please enter a description.');
      return;
    }
    if (!price.trim()) {
      setErrorMessage('Please enter a price.');
      return;
    }
    if (isNaN(price) || parseFloat(price) <= 0) {
      setErrorMessage('Please enter a valid numeric price.');
      return;
    }

    const formattedPrice = parseFloat(price).toFixed(2);

    if (editingId) {
      setMenuItems((prevItems) =>
        prevItems.map((item) =>
          item.id === editingId
            ? { ...item, dishName: dishName.trim(), description: description.trim(), course, price: formattedPrice }
            : item
        )
      );
      setSuccessMessage(`"${dishName.trim()}" updated successfully!`);
      setEditingId(null);
    } else {
      const newDish = {
        id: Date.now().toString(),
        dishName: dishName.trim(),
        description: description.trim(),
        course,
        price: formattedPrice,
      };
      setMenuItems((prevItems) => [...prevItems, newDish]);
      setSuccessMessage(`"${newDish.dishName}" added successfully to the menu!`);
    }

    setDishName('');
    setDescription('');
    setCourse('Starters');
    setPrice('');
    setActiveTab('menu');
  };

  const handleEditItem = (item) => {
    setEditingId(item.id);
    setDishName(item.dishName);
    setDescription(item.description);
    setCourse(item.course);
    setPrice(item.price);
    setErrorMessage('');
    setSuccessMessage('');
    setActiveTab('form');
  };

  const handleDeleteItem = (id, name) => {
    setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setSuccessMessage(`"${name}" was removed from the menu.`);
    if (editingId === id) {
      setEditingId(null);
      setDishName('');
      setDescription('');
      setCourse('Starters');
      setPrice('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setDishName('');
    setDescription('');
    setCourse('Starters');
    setPrice('');
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSelectSuggestion = (suggestion, courseCategory) => {
    setDishName(suggestion.name);
    setDescription(suggestion.desc);
    setPrice(suggestion.price);
    setCourse(courseCategory);
    setSuccessMessage(`"${suggestion.name}" loaded into form! Click "+ Add to Menu" to confirm.`);
    setActiveTab('form');
  };

  const toggleDishInfo = (uniqueKey) => {
    if (expandedInfoKey === uniqueKey) {
      setExpandedInfoKey(null); // Collapse if already open
    } else {
      setExpandedInfoKey(uniqueKey); // Expand details
    }
  };

  const totalItems = menuItems.length;
  const averagePrice =
    totalItems > 0
      ? (menuItems.reduce((sum, item) => sum + parseFloat(item.price), 0) / totalItems).toFixed(2)
      : '0.00';
  const countStarters = menuItems.filter((item) => item.course === 'Starters').length;
  const countMains = menuItems.filter((item) => item.course === 'Mains').length;
  const countDesserts = menuItems.filter((item) => item.course === 'Dessert').length;

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.dishName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedFilter === 'All' || item.course === selectedFilter;
    return matchesSearch && matchesCourse;
  });

  const activeTimeBank = TIME_SUGGESTIONS_BANK[selectedTimeSlot] || TIME_SUGGESTIONS_BANK.Dinner;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF8F5" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.brandTitle}>Christoffel's</Text>
            <Text style={styles.subTitle}>Chef's Menu Manager & Time Suite</Text>
          </View>

          {/* Main Navigation Tabs */}
          <View style={styles.mainNavigationRow}>
            <TouchableOpacity
              style={[styles.navTab, activeTab === 'menu' && styles.navTabActive]}
              onPress={() => setActiveTab('menu')}
            >
              <Text style={[styles.navTabText, activeTab === 'menu' && styles.navTabTextActive]}>
                📋 Your Menu ({totalItems})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navTab, activeTab === 'form' && styles.navTabActive]}
              onPress={() => setActiveTab('form')}
            >
              <Text style={[styles.navTabText, activeTab === 'form' && styles.navTabTextActive]}>
                {editingId ? '✏️ Edit Dish' : '➕ Add Dish'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navTab, activeTab === 'suggestions' && styles.navTabActive]}
              onPress={() => setActiveTab('suggestions')}
            >
              <Text style={[styles.navTabText, activeTab === 'suggestions' && styles.navTabTextActive]}>
                💡 Ideas Tab
              </Text>
            </TouchableOpacity>
          </View>

          {/* Menu Statistics Dashboard */}
          <View style={styles.statsCard}>
            <Text style={styles.sectionHeader}>Menu Overview & Statistics</Text>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{totalItems}</Text>
                <Text style={styles.statLabel}>Total Dishes</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>R {averagePrice}</Text>
                <Text style={styles.statLabel}>Avg Price</Text>
              </View>
            </View>
            <View style={styles.courseCountRow}>
              <Text style={styles.courseCountText}>Starters: {countStarters}</Text>
              <Text style={styles.courseCountText}>Mains: {countMains}</Text>
              <Text style={styles.courseCountText}>Desserts: {countDesserts}</Text>
            </View>
          </View>

          {/* Service Time Slot Selector */}
          <View style={styles.searchCard}>
            <Text style={styles.label}>SERVICE TIME SLOT</Text>
            <View style={styles.filterButtonsRow}>
              {['Breakfast', 'Lunch', 'Dinner', 'Late Night'].map((timeSlot) => (
                <TouchableOpacity
                  key={timeSlot}
                  style={[
                    styles.filterChip,
                    selectedTimeSlot === timeSlot && styles.filterChipActive,
                  ]}
                  onPress={() => setSelectedTimeSlot(timeSlot)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedTimeSlot === timeSlot && styles.filterChipTextActive,
                    ]}
                  >
                    {timeSlot}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Global Search Bar */}
          <View style={styles.searchCard}>
            <Text style={styles.label}>SEARCH MENU DISHES & SUGGESTIONS</Text>
            <TextInput
              style={styles.input}
              placeholder="Start typing a dish name (e.g. Burger, Cake)..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* INSTANT LIVE TYPING SUGGESTIONS */}
          {searchQuery.trim().length > 0 && (
            <View style={styles.suggestionsContainer}>
              <Text style={styles.sectionHeader}>
                🔍 Live Suggestions for "{searchQuery}" ({selectedTimeSlot})
              </Text>

              {['Starters', 'Mains', 'Dessert'].map((courseName) => {
                const matchedSuggestions = activeTimeBank[courseName].filter((s) =>
                  s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  s.desc.toLowerCase().includes(searchQuery.toLowerCase())
                );

                if (matchedSuggestions.length === 0) return null;

                return (
                  <View key={courseName} style={{ marginBottom: 12 }}>
                    <Text style={styles.courseGroupTitle}>--- {courseName} ---</Text>
                    {matchedSuggestions.map((suggestion, idx) => {
                      const uniqueKey = `search-${courseName}-${idx}`;
                      const isExpanded = expandedInfoKey === uniqueKey;

                      return (
                        <View key={idx} style={styles.suggestionCard}>
                          <View style={styles.itemHeader}>
                            <Text style={styles.suggestionTitle}>{suggestion.name}</Text>
                            <Text style={styles.itemPrice}>R {suggestion.price}</Text>
                          </View>
                          <Text style={styles.itemDescription}>{suggestion.desc}</Text>

                          {/* Expanded Dish Info (Ingredients & Preparation) */}
                          {isExpanded && (
                            <View style={styles.dishInfoBox}>
                              <Text style={styles.infoHeading}>🛒 Ingredients:</Text>
                              <Text style={styles.infoText}>{suggestion.ingredients}</Text>
                              <Text style={styles.infoHeading}>👨‍🍳 Preparation Method:</Text>
                              <Text style={styles.infoText}>{suggestion.prep}</Text>
                            </View>
                          )}

                          <View style={styles.suggestionActionRow}>
                            <TouchableOpacity
                              style={styles.infoButton}
                              onPress={() => toggleDishInfo(uniqueKey)}
                            >
                              <Text style={styles.infoButtonText}>
                                {isExpanded ? 'Hide Info' : 'ℹ️ Dish Info'}
                              </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={styles.quickAddButton}
                              onPress={() => handleSelectSuggestion(suggestion, courseName)}
                            >
                              <Text style={styles.quickAddButtonText}>+ Add to Form</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          )}

          {/* VIEW TAB 1: ADD / EDIT FORM */}
          {activeTab === 'form' && (
            <View style={styles.card}>
              <View style={styles.formHeaderRow}>
                <Text style={styles.cardTitle}>
                  {editingId ? 'Edit Menu Item' : 'Create New Dish Entry'}
                </Text>
                {editingId && (
                  <TouchableOpacity onPress={handleCancelEdit}>
                    <Text style={styles.cancelEditText}>Cancel Edit</Text>
                  </TouchableOpacity>
                )}
              </View>

              {errorMessage ? (
                <View style={styles.errorBanner}>
                  <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
              ) : null}

              {successMessage ? (
                <View style={styles.successBanner}>
                  <Text style={styles.successText}>{successMessage}</Text>
                </View>
              ) : null}

              <Text style={styles.label}>DISH NAME</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Lamb Shank"
                placeholderTextColor="#999"
                value={dishName}
                onChangeText={setDishName}
              />

              <Text style={styles.label}>DESCRIPTION</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe ingredients, pairings, and prep highlights..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={3}
                value={description}
                onChangeText={setDescription}
              />

              <View style={styles.row}>
                <View style={styles.halfColumn}>
                  <Text style={styles.label}>COURSE</Text>
                  <View style={styles.pickerWrapper}>
                    <Picker
                      selectedValue={course}
                      onValueChange={(itemValue) => setCourse(itemValue)}
                      style={styles.picker}
                    >
                      <Picker.Item label="Starters" value="Starters" />
                      <Picker.Item label="Mains" value="Mains" />
                      <Picker.Item label="Dessert" value="Dessert" />
                    </Picker>
                  </View>
                </View>

                <View style={styles.halfColumn}>
                  <Text style={styles.label}>PRICE (ZAR)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="R 120"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={price}
                    onChangeText={setPrice}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[styles.addButton, editingId ? styles.updateButton : null]}
                onPress={handleSaveDish}
              >
                <Text style={styles.addButtonText}>
                  {editingId ? 'Save Changes' : '+ Add to Menu'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* VIEW TAB 2: YOUR CUSTOM MENU */}
          {activeTab === 'menu' && (
            <View style={styles.entriesContainer}>
              <Text style={styles.label}>FILTER BY COURSE</Text>
              <View style={[styles.filterButtonsRow, { marginBottom: 16 }]}>
                {['All', 'Starters', 'Mains', 'Dessert'].map((filterCategory) => (
                  <TouchableOpacity
                    key={filterCategory}
                    style={[
                      styles.filterChip,
                      selectedFilter === filterCategory && styles.filterChipActive,
                    ]}
                    onPress={() => setSelectedFilter(filterCategory)}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        selectedFilter === filterCategory && styles.filterChipTextActive,
                      ]}
                    >
                      {filterCategory}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.entriesHeader}>
                Your Custom Menu ({filteredItems.length} of {totalItems} items)
              </Text>

              {filteredItems.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    {menuItems.length === 0
                      ? 'No menu items added yet. Tap "Add Dish" or browse the Ideas Tab to get started.'
                      : 'No custom dishes match your current filter.'}
                  </Text>
                </View>
              ) : (
                filteredItems.map((item) => (
                  <View key={item.id} style={styles.itemCard}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemTitle}>{item.dishName}</Text>
                      <Text style={styles.itemPrice}>R {item.price}</Text>
                    </View>
                    <Text style={styles.itemCategory}>Category: {item.course}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>

                    <View style={styles.itemActionRow}>
                      <TouchableOpacity
                        style={styles.editActionButton}
                        onPress={() => handleEditItem(item)}
                      >
                        <Text style={styles.editActionText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.deleteActionButton}
                        onPress={() => handleDeleteItem(item.id, item.dishName)}
                      >
                        <Text style={styles.deleteActionText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}
            </View>
          )}

          {/* VIEW TAB 3: DEDICATED IDEAS TAB WITH DISH INFO BUTTON */}
          {activeTab === 'suggestions' && (
            <View style={styles.suggestionsContainer}>
              <Text style={styles.sectionHeader}>
                💡 {selectedTimeSlot} Menu Ideas & Suggestions
              </Text>
              
              {/* Course Sub-Filter for Ideas Tab */}
              <View style={[styles.filterButtonsRow, { marginBottom: 16 }]}>
                {['All', 'Starters', 'Mains', 'Dessert'].map((filterCategory) => (
                  <TouchableOpacity
                    key={filterCategory}
                    style={[
                      styles.filterChip,
                      selectedFilter === filterCategory && styles.filterChipActive,
                    ]}
                    onPress={() => setSelectedFilter(filterCategory)}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        selectedFilter === filterCategory && styles.filterChipTextActive,
                      ]}
                    >
                      {filterCategory}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {['Starters', 'Mains', 'Dessert'].map((courseName) => {
                if (selectedFilter !== 'All' && selectedFilter !== courseName) return null;

                return (
                  <View key={courseName} style={{ marginBottom: 16 }}>
                    <Text style={styles.subCategoryHeader}>--- {courseName} ({selectedTimeSlot}) ---</Text>
                    {activeTimeBank[courseName].map((suggestion, idx) => {
                      const uniqueKey = `tab-${courseName}-${idx}`;
                      const isExpanded = expandedInfoKey === uniqueKey;

                      return (
                        <View key={idx} style={styles.suggestionCard}>
                          <View style={styles.itemHeader}>
                            <Text style={styles.suggestionTitle}>{suggestion.name}</Text>
                            <Text style={styles.itemPrice}>R {suggestion.price}</Text>
                          </View>
                          <Text style={styles.itemDescription}>{suggestion.desc}</Text>

                          {/* Expanded Dish Info (Ingredients & Preparation) */}
                          {isExpanded && (
                            <View style={styles.dishInfoBox}>
                              <Text style={styles.infoHeading}>🛒 Ingredients:</Text>
                              <Text style={styles.infoText}>{suggestion.ingredients}</Text>
                              <Text style={styles.infoHeading}>👨‍🍳 Preparation Method:</Text>
                              <Text style={styles.infoText}>{suggestion.prep}</Text>
                            </View>
                          )}

                          <View style={styles.suggestionActionRow}>
                            <TouchableOpacity
                              style={styles.infoButton}
                              onPress={() => toggleDishInfo(uniqueKey)}
                            >
                              <Text style={styles.infoButtonText}>
                                {isExpanded ? 'Hide Info' : 'ℹ️ Dish Info'}
                              </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={styles.quickAddButton}
                              onPress={() => handleSelectSuggestion(suggestion, courseName)}
                            >
                              <Text style={styles.quickAddButtonText}>+ Add to Form</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF8F5' },
  scrollContent: { padding: 20 },
  header: { marginBottom: 16, alignItems: 'center' },
  brandTitle: { fontSize: 28, fontWeight: 'bold', color: '#2C2A29' },
  subTitle: { fontSize: 16, color: '#666', marginTop: 2, fontWeight: '600' },

  mainNavigationRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  navTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFECE6',
  },
  navTabActive: { backgroundColor: '#2C2A29', borderColor: '#2C2A29' },
  navTabText: { fontSize: 12, fontWeight: '700', color: '#6B6864' },
  navTabTextActive: { color: '#FFFFFF' },
  
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFECE6',
    marginBottom: 20,
  },
  sectionHeader: { fontSize: 15, fontWeight: '600', color: '#2C2A29', marginBottom: 12 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  statBox: {
    flex: 1,
    backgroundColor: '#FDFBF7',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E3D9',
  },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#C59B27' },
  statLabel: { fontSize: 11, color: '#6B6864', fontWeight: '700', marginTop: 2 },
  courseCountRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 },
  courseCountText: { fontSize: 12, color: '#555', fontWeight: '600' },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EFECE6',
    marginBottom: 20,
  },
  formHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#2C2A29' },
  cancelEditText: { color: '#9B1C1C', fontSize: 13, fontWeight: '700' },

  searchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFECE6',
    marginBottom: 20,
  },
  filterButtonsRow: { flexDirection: 'row', gap: 6, marginTop: 4 },
  filterChip: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#FDFBF7',
    borderWidth: 1,
    borderColor: '#E8E3D9',
  },
  filterChipActive: { backgroundColor: '#C59B27', borderColor: '#C59B27' },
  filterChipText: { fontSize: 12, color: '#6B6864', fontWeight: '700' },
  filterChipTextActive: { color: '#FFFFFF' },

  label: { fontSize: 11, fontWeight: '700', color: '#6B6864', marginBottom: 6 },
  input: {
    backgroundColor: '#FDFBF7',
    borderWidth: 1,
    borderColor: '#E8E3D9',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#2C2A29',
    marginBottom: 14,
  },
  textArea: { height: 70, textAlignVertical: 'top' },
  row: { flexDirection: 'row', gap: 12 },
  halfColumn: { flex: 1 },
  pickerWrapper: {
    backgroundColor: '#FDFBF7',
    borderWidth: 1,
    borderColor: '#E8E3D9',
    borderRadius: 10,
    marginBottom: 14,
    justifyContent: 'center',
    height: 48,
  },
  picker: { color: '#2C2A29' },
  
  addButton: {
    backgroundColor: '#C59B27',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  updateButton: { backgroundColor: '#2C2A29' },
  addButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },

  errorBanner: {
    backgroundColor: '#FDE8E8',
    borderColor: '#F8B4B4',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  errorText: { color: '#9B1C1C', fontSize: 13 },
  successBanner: {
    backgroundColor: '#EDF7ED',
    borderColor: '#B7DFB9',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  successText: { color: '#1E4620', fontSize: 13 },

  suggestionsContainer: {
    backgroundColor: '#FFFDF9',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#D4AF37',
    marginBottom: 20,
  },
  subCategoryHeader: { fontSize: 14, fontWeight: '700', color: '#8C6D1F', marginBottom: 8, marginTop: 10 },
  courseGroupTitle: { fontSize: 12, fontWeight: 'bold', color: '#555', marginVertical: 6 },
  suggestionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#EFECE6',
  },
  suggestionTitle: { fontSize: 14, fontWeight: 'bold', color: '#2C2A29' },
  
  suggestionActionRow: { flexDirection: 'row', justifyContent: 'flex-start', gap: 8, marginTop: 8 },
  infoButton: {
    backgroundColor: '#FDFBF7',
    borderColor: '#6B6864',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  infoButtonText: { fontSize: 11, fontWeight: '700', color: '#6B6864' },
  quickAddButton: {
    backgroundColor: '#FDFBF7',
    borderColor: '#C59B27',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  quickAddButtonText: { fontSize: 11, fontWeight: '700', color: '#C59B27' },

  dishInfoBox: {
    backgroundColor: '#FAF8F5',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E8E3D9',
  },
  infoHeading: { fontSize: 11, fontWeight: '700', color: '#2C2A29', marginTop: 4 },
  infoText: { fontSize: 12, color: '#555', lineHeight: 16 },

  entriesContainer: { marginTop: 5 },
  entriesHeader: { fontSize: 18, fontWeight: '600', color: '#2C2A29', marginBottom: 12 },
  emptyContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFECE6',
  },
  emptyText: { color: '#777', fontSize: 14, textAlign: 'center' },

  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EFECE6',
  },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  itemTitle: { fontSize: 16, fontWeight: 'bold', color: '#2C2A29' },
  itemPrice: { fontSize: 15, fontWeight: '700', color: '#C59B27' },
  itemCategory: { fontSize: 12, color: '#888', marginBottom: 6 },
  itemDescription: { fontSize: 13, color: '#555', lineHeight: 18, marginBottom: 12 },

  itemActionRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, borderTopWidth: 1, borderTopColor: '#F2EFEC', paddingTop: 10 },
  editActionButton: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 6, backgroundColor: '#FDFBF7', borderWidth: 1, borderColor: '#E8E3D9' },
  editActionText: { fontSize: 12, fontWeight: '700', color: '#2C2A29' },
  deleteActionButton: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 6, backgroundColor: '#FDE8E8', borderWidth: 1, borderColor: '#F8B4B4' },
  deleteActionText: { fontSize: 12, fontWeight: '700', color: '#9B1C1C' },
});