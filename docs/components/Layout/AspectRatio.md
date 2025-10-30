# 📐 AspectRatio Component

The **AspectRatio** component maintains consistent proportions for its content, ensuring elements like images, videos, and embeds display correctly across all screen sizes.  
It uses the CSS padding-bottom technique to preserve proportions while remaining responsive and lightweight.

---

## 📦 Import

```tsx
import { AspectRatio } from 'kovax-react';
```

## 🚀 Quick Start

* Basic Usage

```tsx
// Default 16:9 ratio (perfect for videos)
<AspectRatio>
  <Image src="/hero.jpg" alt="Hero image" />
</AspectRatio>

// Square ratio (1:1)
<AspectRatio ratio={1}>
  <Avatar src="/profile.jpg" />
</AspectRatio>

// 4:3 ratio (classic photos)
<AspectRatio ratio={4/3}>
  <VideoPlayer src="/video.mp4" />
</AspectRatio>
```

* With Constraints and Styling
```tsx
// With maximum dimensions
<AspectRatio ratio={16/9} maxW="800px" maxH="450px">
  <YouTubeEmbed videoId="abc123" />
</AspectRatio>

// With object fit
<AspectRatio ratio={1} objectFit="contain">
  <ProductImage src="/product.jpg" />
</AspectRatio>

// With border radius
<AspectRatio ratio={16/9} borderRadius={8} overflow="hidden">
  <Image src="/banner.jpg" alt="Banner" />
</AspectRatio>
```

## ⚙️ Props Reference

| Prop        | Type                                                       | Default   | Description                           |
| ----------- | ---------------------------------------------------------- | --------- | ------------------------------------- |
| `ratio`     | `number`                                                   | `16/9`    | Aspect ratio (width/height)           |
| `maxW`      | `number \| string`                                         | `-`       | Maximum width constraint              |
| `maxH`      | `number \| string`                                         | `-`       | Maximum height constraint             |
| `objectFit` | `'cover' \| 'contain' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'` | How content fits within the container |


## Common Aspect Ratios

| Ratio | Use Case                            | Padding-bottom |
| ----- | ----------------------------------- | -------------- |
| 16/9  | Widescreen video, YouTube (default) | 56.25%         |
| 4/3   | Traditional video, photos           | 75%            |
| 1     | Square, avatars                     | 100%           |
| 3/2   | Photography                         | 66.67%         |
| 2/3   | Portrait photos                     | 150%           |
| 21/9  | Ultra-wide cinema                   | 42.86%         |


## Inherited Props:
All Box props (spacing, border, radius, overflow, background, etc.)

## 🎯 Examples

* Media Embeds
```tsx
// YouTube Embed
<AspectRatio ratio={16/9} borderRadius={12} overflow="hidden">
  <iframe
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    allowFullScreen
    style={{ border: 'none' }}
  />
</AspectRatio>

// Custom video
<AspectRatio ratio={16/9}>
  <video controls poster="/poster.jpg">
    <source src="/video.mp4" type="video/mp4" />
  </video>
</AspectRatio>
```

* Image Galleries
```tsx
<Grid templateColumns={{ mobile: "1fr", tablet: "repeat(2, 1fr)" }} gap={4}>
  {images.map((img, i) => (
    <AspectRatio key={i} ratio={4/3} borderRadius={8} overflow="hidden">
      <Image src={img.url} alt={img.alt} objectFit="cover" />
    </AspectRatio>
  ))}
</Grid>
```

* Product Card
```tsx
<Card maxW="300px" shadow="md">
  <AspectRatio ratio={1} borderRadius={8} overflow="hidden">
    <Image src="/product.jpg" alt="Product" />
  </AspectRatio>
  <Box p={4}>
    <Heading size="md">Premium Headphones</Heading>
    <Text color="gray.600" mb={3}>Wireless with superior sound.</Text>
    <Flex justify="space-between" align="center">
      <Text fontWeight="bold">$299.99</Text>
      <Button colorScheme="blue">Add to Cart</Button>
    </Flex>
  </Box>
</Card>
```

## 💡 Best Practices
# ✅ Do

* Use appropriate ratios for content types

* Apply maxW and maxH for large media

* Combine with borderRadius and overflow="hidden"

* Use objectFit="contain" for non-croppable media

* Test across devices

# ❌ Don’t

* Use extreme ratios that distort content

* Forget alt attributes

* Nest AspectRatios unnecessarily

# ⚡ Object Fit Reference

| Value        | Description                            |
| ------------ | -------------------------------------- |
| `cover`      | Fills container, crops if needed       |
| `contain`    | Fits within container without cropping |
| `fill`       | Stretches (may distort)                |
| `none`       | Keeps original size                    |
| `scale-down` | Like `contain` but never enlarges      |


# 🔄 Comparison

| Feature           | AspectRatio | CSS `aspect-ratio` | Manual Padding |
| ----------------- | ----------- | ------------------ | -------------- |
| Browser Support   | ✅ All       | ⚠️ Modern only     | ✅ All          |
| React Integration | ✅ Native    | ⚠️ Limited         | ❌ Manual       |
| Responsive Props  | ✅ Yes       | ❌ No               | ❌ No           |
| Performance       | ✅ Optimized | ✅ Native           | ⚠️ Depends     |


# 🧪 Testing

✅ Default 16:9 ratio
✅ Custom ratios
✅ Square and portrait modes
✅ Max width/height constraints
✅ Object fit behavior
✅ Style merging
✅ Child rendering
✅ Memoization

```bash
Test Suites: 1 passed, 1 total
Tests:       13 passed, 13 total
```

## 🔧 Technical Details

| Property        | Value               |
| --------------- | ------------------- |
| Technique       | CSS padding-bottom  |
| Precision       | 2 decimal places    |
| Performance     | Memoized            |
| Size            | ~1.2KB gzipped      |
| Dependencies    | React 16.8+, Box    |
| Browser Support | All modern browsers |
| TypeScript      | ✅ Fully typed       |
| Tree-shakeable  | ✅ Yes               |


## 📊 Status

| Property | Value                                       |
| -------- | ------------------------------------------- |
| Version  | 1.0.0                                       |
| Features | Responsive, flexible, precise ratio control |
| Coverage | ✅ 100% (13/13)                              |
| Status   | ✅ Production Ready                          |


## 🎨 Theme Integration

```tsx
// Using theme spacing
<AspectRatio ratio={16/9} maxW="container.lg">
  <Content />
</AspectRatio>

// Responsive with theme breakpoints
<AspectRatio 
  ratio={{ mobile: 1, desktop: 16/9 }}
  borderRadius="radii.lg"
>
  <Content />
</AspectRatio>

// Themed fallback
<AspectRatio ratio={1} backgroundColor="gray.100">
  <Image src="/photo.jpg" alt="Photo" />
</AspectRatio>
```