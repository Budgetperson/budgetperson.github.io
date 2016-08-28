---
layout: post
title: Pickup Basketball Analytics
hidden: true
---

{% comment %} 
    infinite geo: PPL = (shot_value * percentage) / (1 - percentage)
    y = 3 point %
    x = 2 point %

    2s/3s regular:
    	3y = 2x
    	y = 2x/3

    2s/3s make-it-take-it: this is pretty
    	y = (-2x)/(x-3)
    1s/2s regular:
    	y = x/2
    1s/2s make-it-take-it:
    	y = (-x)/(x-2)

z = avg fg%
y = avg PPS

.5 * 2 + p * .5 + p * z * .5 + p * z^2 * .5 = x * 3 + p * x 

what about the impact of score of the game?

plot y / x vs 2pt%

{% endcomment %}


A while ago, [Kirk Goldsberry had a great article](http://grantland.com/the-triangle/video-how-to-fix-pickup-basketball-with-analytics/) and video on the analytics of pickup basketball. He broke down the implications of playing by 1s and 2s in full-court, 5 on 5 pickup games. However, he never mentions halfcourt games. These games are played by another rule that heavily influences the economics of shot selection: make it take it.

<!--more-->
<script type="text/javascript"
    src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>
## Introduction and Intuition
When halfcourt basketball is played "make it take it", a team keeps the ball if it scores. This way, a team needs to get a stop to get possession. Traditionally, this rule is employed to make sure teams play defense and thereby keep the intensity of the game high. Changing possession in this way works, but it slightly increases the value of shots inside the arc. An inside shot not only has a higher chance of going in, but also has a higher chance of securing an extra possession. In a game scored with 2s and 3s alternating possession, one must hit 3s at a 33% rate to have the same effect as hitting 2s at a 50% rate. From my calculations, playing "make-it-take-it" style requires you to hit 40% from 3 to have the same effect as a 50% 2.

There's more to it than one data point. Taking into account make it take it and scoring methodology, there are four ways pickup games can be played: with or without 2s/3s, and with or without make it take it. Each has different implications for shot selection.

## The Math
When make it take it is not employed, the math is pretty simple. When the game is played with 2s and 3s, 2s are worth 2/3 of what 3s are worth. If y is 3PT% and x is 2PT%, y = 2x/3. Taking our previous example, a 50% two point shot (x = 0.5) translates to three point shot worth 1/3, or approximately 33%.

It's a little tougher for make it take it. Let's take the same example of a 50% two point shot in a game played with 2s and 3s. First, we calculate the points scored each time we have the ball. This ends up being an infinite geometric series. The exact equation is the following [1]:  $$Points Per Possession = \frac{shotvalue * percentage}{1 - percentage}$$ To see the relative percentage, we set the points per possession equal for 2 point and 3 point shots: $$\frac{3 * 3pt\%}{1 - 3pt\%} = \frac{2 * 2pt\%}{1 - 2pt\%}$$

Simplifying this, we end up with the following: $$3pt\% = \frac{2 * 2pt\%}{3 - 2pt\%}$$

This equation is not nearly as intuitive as the one earlier, but lets plug in our value for our percentage on 2s, 50%, to see what we need to shoot on 3 pointers for equivalence. $$3pt\% = \frac{2 * 0.5}{3 - 0.5} = 0.4 = 40\%$$

This means that in order to have the same efficiency as a 50% two point shot, we would need to shoot 40% from 3, which is a lot higher than 33%. Taking 3s becomes a worse proposition.

## Simplifying the Intuition

Having this equivalence of shooting x from beyond the arc equals y from inside the arc is confusing. Instead, we want some concept of some intrinsic value of a shot. Turns out, these two concepts are closely related.

In a simple example, a normal game of 2s and 3s exchanging possessions, we found that the equivalent three point percentage needed to create the same value as a 2 pointer was 2/3rds of the two point percentage. In other words, $$y = 2x/3$$ Rearranging this, $$y/x = 2/3$$. This shows that the ratio of percentages needed to create the same points per possession is 2/3. In other words, a shot inside the arc is 2/3 as powerful as a shot outside the arc. Taking the inverse, we could say a shot outside the arc is 3/2 as powerful as a shot inside the arc.

So for all of our equations, we can rearrange to have the ratio of the normalized shooting percentages be on the left. 

<script src="http://d3js.org/d3.v3.min.js"></script>
<script src="http://maurizzzio.github.io/function-plot/js/function-plot.js"></script>
<script>
window.onload = function() {
  functionPlot({
    target: '#pickupanalyticsgraph',
    width: 500,
    height: 500,
    disableZoom: true,
    xAxis: {
      label: 'Inside Arc %',
      domain: [0, 0.9]
    },
    yAxis: {
      label: 'Outside Arc %',
      domain: [0, 0.9]
    },
    data: [
      {
        fn: 'y = 2x/3',
        color: 'red'
      }, {
        fn: '(-2x)/(x-3)',
        color: 'orange'
      }, {
        fn: 'y = x/2',
        color: '#000'
      }, {
        fn: 'y = (-x)/(x-2)',
        color: 'blue'
      }
    ]
  });
}

</script>
<div id="pickupanalyticsgraph"></div>